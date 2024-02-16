package com.tus.webtech.school_service.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;

@Entity
public class User extends BaseEntity {

	@NotBlank
	private String email;
	@NotBlank
	private String password;
	@Enumerated(EnumType.STRING)
	private UserType role;

	public User() {}
	public User(String email, String password, UserType role) {
		this.email = email;
		this.password = password;
		this.role = role;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public UserType getRole() {
		return role;
	}
	public void setRole(UserType role) {
		this.role = role;
	}
}
