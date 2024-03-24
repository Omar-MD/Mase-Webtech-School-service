package com.tus.schoolservice.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name="parents")
public class Parent extends User {

    @NotBlank
    private String phone;

    @NotBlank
    private String address;

    public Parent() {}
    public Parent(String name, String email, String password,  String role, String phone, String address) {
        super(name, email, password, role);
        this.phone = phone;
        this.address = address;
    }

    @Override
    public String toString() {
    	return "Parent {" +
    			"name: " + this.getName() +
    			", email: " + this.getEmail() +
    			", phone: " + phone +
    			", role: " + this.getRole() +" }";
    }
}