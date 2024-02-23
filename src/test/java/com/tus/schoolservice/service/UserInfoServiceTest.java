package com.tus.schoolservice.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.tus.schoolservice.dao.UserInfoRepo;
import com.tus.schoolservice.dto.SignUpRequest;
import com.tus.schoolservice.dto.UserInfo;
import com.tus.schoolservice.dto.UserRole;
import com.tus.schoolservice.response.ApiResponse;

class UserInfoServiceTest {

    private UserInfoService userInfoService;
    private UserInfoRepo userInfoRepo;
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        userInfoRepo = mock(UserInfoRepo.class);
        passwordEncoder = mock(PasswordEncoder.class);
        userInfoService = new UserInfoService();
        userInfoService.setPasswordEncoder(passwordEncoder);
        userInfoService.setUserInfoRepo(userInfoRepo);
    }

    @Test
    void testLoadUserByUsernameSuccess() {
        UserInfo user = new UserInfo("test@example.com", "testuser", "password", UserRole.ROLE_USER.toString());
        when(userInfoRepo.findByName("testuser")).thenReturn(Optional.of(user));
        assertEquals(user.getName(), userInfoService.loadUserByUsername("testuser").getUsername());
    }

    @Test
    void testLoadUserByUsernameNotFound() {
        when(userInfoRepo.findByName("nonexistentuser")).thenReturn(Optional.empty());
        assertThrows(UsernameNotFoundException.class, () -> userInfoService.loadUserByUsername("nonexistentuser"));
    }

    @Test
    void testAddUserSuccess() {
        SignUpRequest signUpRequest = new SignUpRequest("newuser@example.com", "newuser", "password");
        when(userInfoRepo.findByEmail("newuser@example.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password")).thenReturn("encodedpassword");

        ApiResponse<String> response = userInfoService.addUser(signUpRequest);
        assertEquals(201, response.getStatusCode());
        assertEquals("Account Created!", response.getData());
    }

    @Test
    void testAddUserExistingEmail() {
        SignUpRequest signUpRequest = new SignUpRequest("existinguser@example.com", "existinguser", "password");
        UserInfo existingUser = new UserInfo("existinguser@example.com", "existinguser", "password", UserRole.ROLE_USER.toString());
        when(userInfoRepo.findByEmail("existinguser@example.com")).thenReturn(Optional.of(existingUser));

        ApiResponse<String> response = userInfoService.addUser(signUpRequest);
        assertEquals(409, response.getStatusCode());
        assertEquals("Email already in use!", response.getErrorMsg());
    }

    @Test
    void testAddUserInsecurePassword() {
        SignUpRequest signUpRequest = new SignUpRequest("newuser@example.com", "newuser", "123");
        when(userInfoRepo.findByEmail("newuser@example.com")).thenReturn(Optional.empty());

        ApiResponse<String> response = userInfoService.addUser(signUpRequest);
        assertEquals(400, response.getStatusCode());
        assertEquals("Password insecure!", response.getErrorMsg());
    }
}
