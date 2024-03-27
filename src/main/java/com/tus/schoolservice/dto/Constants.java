package com.tus.schoolservice.dto;

public enum Constants {
    INVALID_EMAIL("Invalid email!"),
    USERNAME_TAKEN("Username already in use!"),
    ACC_CREATED("Account Created!"),
    SUBMISSION_CREATED("Submission created!"),
    SUBMISSION_EDITED("Submission edited!"),
    SUBMISSION_NOT_FOUND("Submission not found!"),
    SUBMISSION_STATUS_UPDATED("Submission status updated!"),
    NOT_SECURE("Password insecure!"),
    INVALID_CRED("Unauthorized: Invalid email or password!"),
    ADMIN_EMAIL("@ss-admin.com"),
    EMAIL_REGX("^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"),
    INVALID_STUDENT_DETAIL("Invalid Student Details!"),
    INVALID_PARENT_EMAIL("Invalid Parent Email!"),
    PARENT_NOT_FOUND("Parent Not Found!");

    private final String value;

    Constants(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}