package com.tus.schoolservice.dto.student;

import java.time.LocalDate;

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

    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String medicalInformation;

    // Constructors
    public Student() {}
    public Student(@NotBlank String name, MartialArtsLevel martialArtsLevel, CodingLevel codingLevel,
			LocalDate dateOfBirth, Gender gender, String medicalInformation) {
		super();
		this.name = name;
		this.martialArtsLevel = martialArtsLevel;
		this.codingLevel = codingLevel;
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
		this.medicalInformation = medicalInformation;
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

    public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public String getMedicalInformation() {
		return medicalInformation;
	}
	public void setMedicalInformation(String medicalInformation) {
		this.medicalInformation = medicalInformation;
	}

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", martialArtsLevels=" + martialArtsLevel +
                ", codingLevels=" + codingLevel +
                ", dateOfBirth=" + dateOfBirth +
                ", gender=" + gender +
                ", medicalInformation='" + medicalInformation + '\'' +
                '}';
    }
}