package com.tus.schoolservice.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "admins")
public class Admin extends User {

	public Admin() {}
    public Admin(String name, String email, String password, String role) {
        super(email, name, password, role);
    }
}
