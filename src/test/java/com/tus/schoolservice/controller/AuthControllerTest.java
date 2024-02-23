package com.tus.schoolservice.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import com.tus.schoolservice.dao.UserRepo;
import com.tus.schoolservice.dto.User;
import com.tus.schoolservice.dto.UserDetail;
import com.tus.schoolservice.dto.UserType;
import com.tus.schoolservice.response.ApiResponse;

class AuthControllerTest {
	private AuthController authController;
	private UserRepo userRepoMock;

	@BeforeEach
	void setUp() {
		userRepoMock = mock(UserRepo.class);
		authController = new AuthController(userRepoMock);
	}

	@Test
	void loginInvalidPasswordTest() {
		UserDetail userDetail = new UserDetail("test@test.com", "1234");
		User testUser = new User("test@test.com", "12345", UserType.PARENT);
		when(userRepoMock.findByEmail(userDetail.getEmail())).thenReturn(Optional.of(testUser));
		ApiResponse<String> resp = authController.login(userDetail);

		 assertEquals(HttpStatus.UNAUTHORIZED.value(), resp.getStatusCode());
		 assertEquals("Invalid email or password!", resp.getErrorMsg());
		 assertNull(resp.getData());
	}

	@Test
	void loginNoAccountTest() {
		UserDetail userDetail = new UserDetail("test@test.com", "1234");

		when(userRepoMock.findByEmail(userDetail.getEmail())).thenReturn(Optional.empty());
		ApiResponse<String> resp = authController.login(userDetail);

		 assertEquals(HttpStatus.UNAUTHORIZED.value(), resp.getStatusCode());
		 assertEquals("Invalid email or password!", resp.getErrorMsg());
		 assertNull(resp.getData());
	}

	@Test
	void loginValidCredTest() {
		UserDetail userDetail = new UserDetail("test@test.com", "12345");
		User testUser = new User("test@test.com", "12345", UserType.PARENT);

		when(userRepoMock.findByEmail(userDetail.getEmail())).thenReturn(Optional.of(testUser));
		ApiResponse<String> resp = authController.login(userDetail);

		assertEquals(HttpStatus.OK.value(), resp.getStatusCode());
		assertEquals("PARENT", resp.getData());
		assertNull(resp.getErrorMsg());
	}

	@Test
	void signupEmailTakenTest() {
		UserDetail userDetail = new UserDetail("test@test.com", "12345");
		User testUser = new User("test@test.com", "12345", UserType.PARENT);

		when(userRepoMock.findByEmail(userDetail.getEmail())).thenReturn(Optional.of(testUser));
		ApiResponse<String> resp = authController.signup(userDetail);

		assertEquals(HttpStatus.CONFLICT.value(), resp.getStatusCode());
		assertEquals("Email already in use!", resp.getErrorMsg());
		assertNull(resp.getData());
	}

	@Test
	void signupValidParentTest() {
		UserDetail userDetail = new UserDetail("test@test.com", "12345");

		when(userRepoMock.findByEmail(userDetail.getEmail())).thenReturn(Optional.empty());
		ApiResponse<String> resp = authController.signup(userDetail);

		assertEquals(HttpStatus.CREATED.value(), resp.getStatusCode());
		assertEquals("Account Created!", resp.getData());
		assertNull(resp.getErrorMsg());
	}

	@Test
	void signupValidAdminTest() {
		UserDetail userDetail = new UserDetail("test@ss-admin.com", "12345");

		when(userRepoMock.findByEmail(userDetail.getEmail())).thenReturn(Optional.empty());
		ApiResponse<String> resp = authController.signup(userDetail);

		assertEquals(HttpStatus.CREATED.value(), resp.getStatusCode());
		assertEquals("Account Created!", resp.getData());
		assertNull(resp.getErrorMsg());
	}
}
