package com.tus.schoolservice.service;

import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tus.schoolservice.dao.UserInfoRepo;
import com.tus.schoolservice.dto.SignUpRequest;
import com.tus.schoolservice.dto.UserInfo;
import com.tus.schoolservice.dto.UserInfoDetails;
import com.tus.schoolservice.dto.UserRole;
import com.tus.schoolservice.response.ApiResponse;


@Service
public class UserInfoService implements UserDetailsService {

	private static final String EMAIL_REGX = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
	private static final String INVALID_EMAIL = "Invalid email!";
	private static final String EMAIL_TAKEN = "Email already in use!";
	private static final String ACC_CREATED = "Account Created!";
	private static final String NOT_SECURE = "Password insecure!";

	@Autowired
    private UserInfoRepo userRepo;
	@Autowired
    private PasswordEncoder encoder;

	void setUserInfoRepo(UserInfoRepo userRepo) {
		this.userRepo = userRepo;
	}

	void setPasswordEncoder(PasswordEncoder encoder) {
		this.encoder = encoder;
	}

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserInfo> userDetail = userRepo.findByName(username);

        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }

    public ApiResponse<String> addUser(SignUpRequest userInfo) {
    	String email = userInfo.getEmail();

		if (!isValidEmail(email)) {
			return ApiResponse.error(HttpStatus.BAD_REQUEST.value(), INVALID_EMAIL);
		}

		Optional<UserInfo> userOpt = userRepo.findByEmail(email);
		if (userOpt.isPresent()) {
			return ApiResponse.error(HttpStatus.CONFLICT.value(), EMAIL_TAKEN);
		}

		if(!isPasswordSecure(userInfo.getPassword())){
			return ApiResponse.error(HttpStatus.BAD_REQUEST.value(), NOT_SECURE);
		}

		UserInfo user = new UserInfo();
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
    	return email.contains("@ss-admin.com")? UserRole.ROLE_ADMIN.toString(): UserRole.ROLE_USER.toString();
    }
}