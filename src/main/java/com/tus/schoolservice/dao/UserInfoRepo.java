package com.tus.schoolservice.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tus.schoolservice.dto.User;

@Repository
public interface UserInfoRepo extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
	Optional<User> findByName(String name);
}
