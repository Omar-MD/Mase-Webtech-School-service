package com.tus.schoolservice.dto.student;

public enum CodingLevel {
    ILLETERATE("Illeterate"),
    INITIATE("Initiate"),
    ACOLYTE("Acolyte"),
    JUNIOR_DEVELOPER("Junior Developer"),
    SENIOR_DEVELOPER("Senior Developer"),
    PRINCIPAL_DEVELOPER("Principal Developer");

    private final String level;

    CodingLevel(String level) {
        this.level = level;
    }

    public String getLevel() {
        return level;
    }
}