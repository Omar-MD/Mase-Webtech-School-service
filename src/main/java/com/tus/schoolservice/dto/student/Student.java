package com.tus.schoolservice.dto.student;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "students")
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

    @NotBlank
	private String name;

    @Enumerated(EnumType.STRING)
    private MartialArtsLevel martialArtsLevel;

    @Enumerated(EnumType.STRING)
    private CodingLevel codingLevel;

    // Constructors
    public Student() {}
    public Student(String name, MartialArtsLevel martialArtsLevel, CodingLevel codingLevel) {
        super();
        this.name = name;
        this.martialArtsLevel = martialArtsLevel;
        this.codingLevel = codingLevel;
    }

    // Getters and setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MartialArtsLevel getMartialArtsLevel() {
        return martialArtsLevel;
    }

    public void setMartialArtsLevel(MartialArtsLevel martialArtsLevel) {
        this.martialArtsLevel = martialArtsLevel;
    }

    public CodingLevel getCodingLevel() {
        return codingLevel;
    }

    public void setCodingLevel(CodingLevel codingLevel) {
        this.codingLevel = codingLevel;
    }

    // toString method for debugging or logging
    @Override
    public String toString() {
        return "Student{" +
                ", name='" + name + '\'' +
                ", martialArtsLevels=" + martialArtsLevel +
                ", codingLevels=" + codingLevel + '}';
    }
}