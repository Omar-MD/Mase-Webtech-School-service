package com.tus.schoolservice.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tus.schoolservice.dto.UserInfo;

@Repository
public interface UserInfoRepo extends JpaRepository<UserInfo, Long> {
	Optional<UserInfo> findByEmail(String email);
	Optional<UserInfo> findByName(String name);
}
