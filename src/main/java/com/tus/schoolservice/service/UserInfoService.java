package com.tus.schoolservice.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tus.schoolservice.dao.UserInfoRepo;
import com.tus.schoolservice.dto.User;
import com.tus.schoolservice.dto.UserInfoDetails;

@Service
public class UserInfoService implements UserDetailsService {

    private UserInfoRepo userRepo;
	public UserInfoService(UserInfoRepo userRepo) {
		this.userRepo = userRepo;
	}

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> userDetail = userRepo.findByName(username);

        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }

    public String loadUserRole(String username) throws UsernameNotFoundException {

        Optional<User> userDetail = userRepo.findByName(username);

        return userDetail.map(User::getRole)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }
}