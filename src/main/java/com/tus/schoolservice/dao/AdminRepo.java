package com.tus.schoolservice.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tus.schoolservice.dto.Admin;

@Repository
public interface AdminRepo  extends JpaRepository<Admin, Long>{
	Optional<Admin> findByEmail(String email);
}