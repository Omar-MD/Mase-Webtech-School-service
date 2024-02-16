package com.tus.webtech.school_service.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tus.webtech.school_service.dao.UserRepo;
import com.tus.webtech.school_service.dto.User;
import com.tus.webtech.school_service.dto.UserDetail;
import com.tus.webtech.school_service.dto.UserType;
import com.tus.webtech.school_service.response.ApiResponse;

import jakarta.validation.Valid;

@RestController
public class AuthenticationController {

	private static final String INVALID_CRED = "Invalid email or password!";
	private static final String EMAIL_TAKEN = "Email already in use!";
	private static final String ACC_CREATED = "Account Created!";

	private final UserRepo userRepo;
	public AuthenticationController(UserRepo userRepo) {
		this.userRepo = userRepo;
	}

	@PostMapping("/login")
	ApiResponse<String> login(@Valid @RequestBody UserDetail userDetail) {
		String email = userDetail.getEmail();
		String password = userDetail.getPassword();
		Optional<User> userOpt = userRepo.findByEmail(email);

		if (userOpt.isEmpty()) {
			return ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), INVALID_CRED);

		} else {
			User user = userOpt.get();
			// TODO: Decrypt password
			if (user.getPassword().equals(password)) {
				return ApiResponse.ok(HttpStatus.OK.value(), user.getRole().toString());

			} else {
				return ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), INVALID_CRED);
			}
		}
	}

	@PostMapping("/signup")
	ApiResponse<String> signup(@Valid @RequestBody UserDetail userDetail) {
		String email = userDetail.getEmail();
		String password = userDetail.getPassword();
		Optional<User> userOpt = userRepo.findByEmail(email);

		// TODO: Check Secure Password
		if (userOpt.isPresent()) {
			return ApiResponse.error(HttpStatus.CONFLICT.value(), EMAIL_TAKEN);

		} else {
			// TODO: Encrypt Password
			User user = new User(email, password, UserType.PARENT);
			if(email.contains("@ss-admin.com")) {
				 	user.setRole(UserType.ADMIN);
			}

			userRepo.save(user);
			return ApiResponse.ok(HttpStatus.CREATED.value(), ACC_CREATED);
		}
	}
}
