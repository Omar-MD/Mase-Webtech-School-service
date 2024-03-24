package com.tus.schoolservice.request;

import java.time.LocalDate;

import com.tus.schoolservice.dto.student.CodingLevel;
import com.tus.schoolservice.dto.student.Gender;
import com.tus.schoolservice.dto.student.MartialArtsLevel;

public class RegisterRequest {
	String parentName;
	String studentName;
	MartialArtsLevel studentMartialLevel;
	CodingLevel	studentCodingLevel;
    LocalDate studentDateOfBirth;
    Gender studentGender;
    String studentMedicalInformation;

	public String getParentName() {
		return parentName;
	}
	public String getStudentName() {
		return studentName;
	}
	public MartialArtsLevel getStudentMartialLevel() {
		return studentMartialLevel;
	}
	public CodingLevel getStudentCodingLevel() {
		return studentCodingLevel;
	}
	public LocalDate getStudentDateOfBirth() {
		return studentDateOfBirth;
	}
	public Gender getStudentGender() {
		return studentGender;
	}
	public String getStudentMedicalInformation() {
		return studentMedicalInformation;
	}
}
