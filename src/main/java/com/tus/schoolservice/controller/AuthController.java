package com.tus.schoolservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tus.schoolservice.dto.AuthRequest;
import com.tus.schoolservice.dto.AuthResponse;
import com.tus.schoolservice.dto.SignUpRequest;
import com.tus.schoolservice.response.ApiResponse;
import com.tus.schoolservice.service.JwtService;
import com.tus.schoolservice.service.UserInfoService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	private static final String INVALID_CRED = "Unathorized: Invalid email or password!";

	@Autowired
	private UserInfoService service;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/addNewUser")
	public ApiResponse<String> addNewUser(@RequestBody SignUpRequest userInfo) {
		return service.addUser(userInfo);
	}

	@PostMapping("/authenticate")
	public ApiResponse<AuthResponse> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

			if (authentication.isAuthenticated()) {
				String token = jwtService.generateToken(authRequest.getUsername());
				AuthResponse resp = new AuthResponse(token, authRequest.getUsername());
				return ApiResponse.ok(HttpStatus.OK.value(), resp);

			} else {
				return ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), INVALID_CRED);

			}
		} catch (BadCredentialsException ex) {
			return ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), INVALID_CRED);
		}
	}
}
