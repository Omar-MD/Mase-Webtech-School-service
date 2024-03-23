package com.tus.schoolservice.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@SuppressWarnings("serial")
@Entity
@Table(name="user_info")
public class User extends BaseEntity{

	@NotBlank
	private String email;

	@NotBlank
	private String name;

	@NotBlank
	private String password;

	@NotBlank
	private String role;

	public User() {}
	public User(String email, String name, String password, String role) {
		super();
		this.email = email;
		this.name = name;
		this.password = password;
		this.role = role;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRoles(String role) {
		this.role = role;
	}
}
