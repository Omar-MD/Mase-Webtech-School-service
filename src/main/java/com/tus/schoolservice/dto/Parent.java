package com.tus.schoolservice.dto;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;

@SuppressWarnings("serial")
@Entity
public class Parent extends User {

    @NotBlank
    private String phone;

    @NotBlank
    private String address;


	@OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Student> submittedStudents;

    public Parent() {
        submittedStudents = new ArrayList<>();
    }

    public Parent(String email, String name, String password, String phone, String address) {
        super(email, name, password, UserRole.PARENT.getRole());
        this.phone = phone;
        this.address = address;
        submittedStudents = new ArrayList<>();
    }

    public List<Student> getSubmittedStudents() {
        return submittedStudents;
    }

    public void setSubmittedStudents(List<Student> submittedStudents) {
        this.submittedStudents = submittedStudents;
    }
}