package com.tus.schoolservice.dto;

public enum UserRole {
    ADMIN("Admin"),
    PARENT("Parent");

    private final String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}