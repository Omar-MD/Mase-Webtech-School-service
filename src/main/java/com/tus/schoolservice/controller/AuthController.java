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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tus.schoolservice.dao.AdminRepo;
import com.tus.schoolservice.dao.ParentRepo;
import com.tus.schoolservice.dao.UserInfoRepo;
import com.tus.schoolservice.dto.Admin;
import com.tus.schoolservice.dto.Constants;
import com.tus.schoolservice.dto.Parent;
import com.tus.schoolservice.dto.User;
import com.tus.schoolservice.dto.UserRole;
import com.tus.schoolservice.request.AuthRequest;
import com.tus.schoolservice.request.SignUpRequest;
import com.tus.schoolservice.response.ApiResponse;
import com.tus.schoolservice.response.AuthResponse;
import com.tus.schoolservice.service.JwtService;
import com.tus.schoolservice.service.UserInfoService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private AuthenticationManager authenticationManager;
	private UserInfoService userService;
	private JwtService jwtService;
	private PasswordEncoder encoder;
	private UserInfoRepo userRepo;
	private ParentRepo parentRepo;
	private AdminRepo adminRepo;

	public AuthController(AuthenticationManager authenticationManager, UserInfoService userService, JwtService jwtService, PasswordEncoder encoder, UserInfoRepo userRepo, ParentRepo parentRepo, AdminRepo adminRepo) {
		this.authenticationManager = authenticationManager;
		this.userService = userService;
		this.jwtService = jwtService;
		this.encoder = encoder;
		this.userRepo = userRepo;
		this.parentRepo = parentRepo;
		this.adminRepo = adminRepo;
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
				return ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), Constants.INVALID_CRED.getValue());

			}
		} catch (BadCredentialsException ex) {
			return ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), Constants.INVALID_CRED.getValue());
		}
	}

	@PostMapping("/addNewUser")
	public ApiResponse<String> addNewUser(@RequestBody SignUpRequest userInfo) {
		String email = userInfo.getEmail();

		// Validation
		if (!isValidEmail(email)) {
			return ApiResponse.error(HttpStatus.BAD_REQUEST.value(), Constants.INVALID_EMAIL.getValue());
		}
		Optional<User> userOpt = userRepo.findByName(userInfo.getUsername());
		if (userOpt.isPresent()) {
			return ApiResponse.error(HttpStatus.CONFLICT.value(), Constants.USERNAME_TAKEN.getValue());
		}
		if(!isPasswordSecure(userInfo.getPassword())){
			return ApiResponse.error(HttpStatus.BAD_REQUEST.value(), Constants.NOT_SECURE.getValue());
		}

		String role = getRole(email);
		String name = userInfo.getUsername();
		String password = encoder.encode(userInfo.getPassword());

		// Create Parent
		if(role.equals(UserRole.PARENT.toString())) {
			Parent newParent = new Parent(name, email, password, UserRole.PARENT.toString(), "Phone", "Address");
			parentRepo.save(newParent);

		}else {
			// Create Admin
			Admin newAdmin = new Admin(name, email, password, UserRole.ADMIN.toString());
			adminRepo.save(newAdmin);
		}

		return ApiResponse.ok(HttpStatus.CREATED.value(), Constants.ACC_CREATED.getValue());
	}


    public boolean isPasswordSecure(String pass) {
		return pass.length() > 3;
    }

    public boolean isValidEmail(String email) {
    	return Pattern.matches(Constants.EMAIL_REGX.getValue(), email);
    }

    public String getRole(String email) {
    	return email.contains(Constants.ADMIN_EMAIL.getValue())? UserRole.ADMIN.toString(): UserRole.PARENT.toString();
    }
}
