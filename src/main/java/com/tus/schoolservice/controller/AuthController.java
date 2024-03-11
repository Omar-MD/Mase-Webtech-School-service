package com.tus.schoolservice.controller;

import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tus.schoolservice.dao.UserInfoRepo;
import com.tus.schoolservice.dto.User;
import com.tus.schoolservice.dto.UserRole;
import com.tus.schoolservice.request.AuthRequest;
import com.tus.schoolservice.request.SignUpRequest;
import com.tus.schoolservice.response.ApiResponse;
import com.tus.schoolservice.response.AuthResponse;
import com.tus.schoolservice.service.JwtService;
import com.tus.schoolservice.service.UserInfoService;

@RestController
public class AuthController {

	private static final String EMAIL_REGX = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
	private static final String INVALID_EMAIL = "Invalid email!";
	private static final String EMAIL_TAKEN = "Email already in use!";
	private static final String ACC_CREATED = "Account Created!";
	private static final String NOT_SECURE = "Password insecure!";
	private static final String INVALID_CRED = "Unathorized: Invalid email or password!";

	private AuthenticationManager authenticationManager;
	private UserInfoService userService;
	private JwtService jwtService;
	private PasswordEncoder encoder;
	private UserInfoRepo userRepo;

	public AuthController(AuthenticationManager authenticationManager, UserInfoService userService, JwtService jwtService, PasswordEncoder encoder, UserInfoRepo userRepo) {
		this.authenticationManager = authenticationManager;
		this.userService = userService;
		this.jwtService = jwtService;
		this.encoder = encoder;
		this.userRepo = userRepo;
	}

	@PostMapping("/authenticate")
	public ApiResponse<AuthResponse> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
		try {
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

			if (authentication.isAuthenticated()) {
				String token = jwtService.generateToken(authRequest.getUsername());
				String role = userService.loadUserRole(authRequest.getUsername());
				AuthResponse resp = new AuthResponse(token, role);
				return ApiResponse.ok(HttpStatus.OK.value(), resp);

			} else {
				return ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), INVALID_CRED);

			}
		} catch (BadCredentialsException ex) {
			return ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), INVALID_CRED);
		}
	}

	@PostMapping("/addNewUser")
	public ApiResponse<String> addNewUser(@RequestBody SignUpRequest userInfo) {
		String email = userInfo.getEmail();

		if (!isValidEmail(email)) {
			return ApiResponse.error(HttpStatus.BAD_REQUEST.value(), INVALID_EMAIL);
		}

		Optional<User> userOpt = userRepo.findByEmail(email);
		if (userOpt.isPresent()) {
			return ApiResponse.error(HttpStatus.CONFLICT.value(), EMAIL_TAKEN);
		}

		if(!isPasswordSecure(userInfo.getPassword())){
			return ApiResponse.error(HttpStatus.BAD_REQUEST.value(), NOT_SECURE);
		}

		User user = new User();
		user.setEmail(email);
		user.setName(userInfo.getUsername());
		user.setPassword(encoder.encode(userInfo.getPassword()));
		user.setRoles(getRole(email));

		userRepo.save(user);
		return ApiResponse.ok(HttpStatus.CREATED.value(), ACC_CREATED);
	}


    public boolean isPasswordSecure(String pass) {
		return pass.length() > 3;
    }

    public boolean isValidEmail(String email) {
    	return Pattern.matches(EMAIL_REGX, email);
    }

    public String getRole(String email) {
    	return email.contains("@ss-admin.com")? UserRole.ADMIN.toString(): UserRole.PARENT.toString();
    }
}
