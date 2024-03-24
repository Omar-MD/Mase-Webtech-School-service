package com.tus.schoolservice.dto.student;

public enum MartialArtsLevel {
    NOVICE("Novice"),
    APPRENTICE("Apprentice"),
    JOURNEYMAN("Journeyman"),
    WARRIOR("Warrior"),
    MASTER("Master"),
    GRAND_MASTER("Grand Master");

    private final String level;

    MartialArtsLevel(String level) {
        this.level = level;
    }

    public String getLevel() {
        return level;
    }
}