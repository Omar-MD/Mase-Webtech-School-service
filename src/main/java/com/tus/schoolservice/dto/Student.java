package com.tus.schoolservice.dto;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@SuppressWarnings("serial")
@Entity
@Table(name = "students")
public class Student extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Parent parent;

    @NotBlank
	private String name;

    @Enumerated(EnumType.STRING)
    private List<MartialArtsLevel> martialArtsLevels;

    @Enumerated(EnumType.STRING)
    private List<CodingLevel> codingLevels;

    // Constructors
    public Student() {
    }

    public Student(String name, List<MartialArtsLevel> martialArtsLevels, List<CodingLevel> codingLevels, Parent parent) {
        super();
        this.name = name;
        this.martialArtsLevels = martialArtsLevels;
        this.codingLevels = codingLevels;
        this.parent = parent;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<MartialArtsLevel> getMartialArtsLevels() {
        return martialArtsLevels;
    }

    public void setMartialArtsLevels(List<MartialArtsLevel> martialArtsLevels) {
        this.martialArtsLevels = martialArtsLevels;
    }

    public List<CodingLevel> getCodingLevels() {
        return codingLevels;
    }

    public void setCodingLevels(List<CodingLevel> codingLevels) {
        this.codingLevels = codingLevels;
    }

    // toString method for debugging or logging
    @Override
    public String toString() {
        return "Student{" +
                ", name='" + name + '\'' +
                ", martialArtsLevels=" + martialArtsLevels +
                ", codingLevels=" + codingLevels + '}';
    }
}