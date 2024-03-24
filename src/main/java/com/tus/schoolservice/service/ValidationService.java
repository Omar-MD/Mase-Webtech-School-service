package com.tus.schoolservice.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import com.tus.schoolservice.dto.student.CodingLevel;
import com.tus.schoolservice.dto.student.Gender;
import com.tus.schoolservice.dto.student.MartialArtsLevel;
import com.tus.schoolservice.request.RegisterRequest;

public class ValidationService {
    private static final int MINIMUM_AGE = 5;
    private ValidationService() {}

	public static List<String> isValidStudent(RegisterRequest registerRequest) {
		List<String> invalidFields = new ArrayList<>(5);
        if (registerRequest.getStudentName() == null || registerRequest.getStudentName().trim().isEmpty()) {
            invalidFields.add("name");
        }
        if (registerRequest.getStudentMartialLevel() == null || !isValidMartialArtsLevel(registerRequest.getStudentMartialLevel())) {
            invalidFields.add("martialArtsLevel");
        }
        if (registerRequest.getStudentCodingLevel() == null || !isValidCodingLevel(registerRequest.getStudentCodingLevel())) {
            invalidFields.add("codingLevel");
        }
        if (registerRequest.getStudentDateOfBirth() == null || !isValidDateOfBirth(registerRequest.getStudentDateOfBirth())) {
            invalidFields.add("dateOfBirth");
        }
        if (registerRequest.getStudentGender() == null || !isValidGender(registerRequest.getStudentGender())) {
            invalidFields.add("gender");
        }

		return invalidFields;
	}

	private static boolean isValidMartialArtsLevel(MartialArtsLevel martialArtsLevel) {
		return EnumSet.allOf(MartialArtsLevel.class).contains(martialArtsLevel);
	}

	private static boolean isValidCodingLevel(CodingLevel codingLevel) {
		return EnumSet.allOf(CodingLevel.class).contains(codingLevel);
	}

    private static boolean isValidDateOfBirth(LocalDate dateOfBirth) {
        LocalDate fiveYearsAgo = LocalDate.now().minusYears(MINIMUM_AGE);
        return !dateOfBirth.isAfter(fiveYearsAgo);
    }

    private static boolean isValidGender(Gender gender) {
        return gender == Gender.MALE || gender == Gender.FEMALE;
    }
}
