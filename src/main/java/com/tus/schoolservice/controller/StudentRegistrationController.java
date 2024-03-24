package com.tus.schoolservice.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tus.schoolservice.dao.ParentRepo;
import com.tus.schoolservice.dao.StudentRegistrationRepo;
import com.tus.schoolservice.dao.StudentRepo;
import com.tus.schoolservice.dto.Constants;
import com.tus.schoolservice.dto.Parent;
import com.tus.schoolservice.dto.student.CodingLevel;
import com.tus.schoolservice.dto.student.MartialArtsLevel;
import com.tus.schoolservice.dto.student.RegistrationStatus;
import com.tus.schoolservice.dto.student.Student;
import com.tus.schoolservice.dto.student.StudentRegistration;
import com.tus.schoolservice.request.RegisterRequest;
import com.tus.schoolservice.response.ApiResponse;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/student-registration")
public class StudentRegistrationController {

	private StudentRegistrationRepo studentRegistrationRepo;
	private ParentRepo parentRepo;
	private StudentRepo studentRepo;

	public StudentRegistrationController(ParentRepo parentRepo, StudentRegistrationRepo studentRegistrationRepo,
			StudentRepo studentRepo) {
		this.parentRepo = parentRepo;
		this.studentRegistrationRepo = studentRegistrationRepo;
		this.studentRepo = studentRepo;
	}

	@Transactional
	@PreAuthorize("hasAuthority('PARENT')")
	@PostMapping("/submit")
	public ApiResponse<RegistrationStatus> submitRegistration(@RequestBody RegisterRequest regReq) {
		// Student Validation
		List<String> invalidFields = isValidStudent(regReq);
		if (!invalidFields.isEmpty()) {
			return ApiResponse.error(HttpStatus.BAD_REQUEST.value(),
					Constants.INVALID_STUDENT_DETAIL.getValue() + invalidFields);
		}

		// Parent Validation
		String parentEmail = regReq.getParentEmail();
		Optional<Parent> parent = parentRepo.findByEmail(parentEmail);
		if (parent.isEmpty()) {
			return ApiResponse.error(HttpStatus.NOT_FOUND.value(), Constants.PARENT_NOT_FOUND.getValue());
		}

		// Create Student
		String name = regReq.getStudentName();
		MartialArtsLevel martialArtsLevel = MartialArtsLevel.valueOf(regReq.getStudentMartialLevel().toUpperCase());
		CodingLevel codingLevel = CodingLevel.valueOf(regReq.getStudentCodingLevel().toUpperCase());
		Student newStudent = new Student(name, martialArtsLevel, codingLevel);
		studentRepo.save(newStudent);

		// Create StudentRegistration
		StudentRegistration studentRegistration = new StudentRegistration(parent.get(), newStudent,
				RegistrationStatus.SUBMITTED);
		studentRegistrationRepo.save(studentRegistration);

		return ApiResponse.ok(HttpStatus.CREATED.value(), RegistrationStatus.SUBMITTED);
	}

	@Transactional
	@PreAuthorize("hasAuthority('PARENT')")
	@PutMapping("/edit")
	public ApiResponse<String> editSubmission(@RequestBody RegisterRequest regReq) {

		// Student Validation
		List<String> invalidFields = isValidStudent(regReq);
		if (!invalidFields.isEmpty()) {
			return ApiResponse.error(HttpStatus.BAD_REQUEST.value(),
					Constants.INVALID_STUDENT_DETAIL.getValue() + invalidFields);
		}

		// Find submission -> Can Only Edit before its reviewed
		String parentEmail = regReq.getParentEmail();
		Optional<Parent> optParent = parentRepo.findByEmail(parentEmail);
		if (optParent.isEmpty()) {
			return ApiResponse.error(HttpStatus.NOT_FOUND.value(), Constants.PARENT_NOT_FOUND.getValue());
		}

		Parent parent = optParent.get();
		List<StudentRegistration> submissions = studentRegistrationRepo.findByParent(parent);
		Optional<StudentRegistration> submission = submissions.stream()
				.filter(sub -> sub.getStudent().getName().equals(regReq.getStudentName()) && sub.getStatus().equals(RegistrationStatus.SUBMITTED))
				.findFirst();

		if(submission.isEmpty()) {
			return ApiResponse.error(HttpStatus.NOT_FOUND.value(), "No matching submission found to update.");
		}else {
			StudentRegistration sub = submission.get();
			//Update submission details
			sub.getStudent().setName(regReq.getStudentName());
			sub.getStudent().setMartialArtsLevel(MartialArtsLevel.valueOf(regReq.getStudentMartialLevel().toUpperCase()));
			sub.getStudent().setCodingLevel(CodingLevel.valueOf(regReq.getStudentCodingLevel().toUpperCase()));
			sub.setUpdatedAt(LocalDateTime.now());
            studentRegistrationRepo.save(sub);
            return ApiResponse.ok(HttpStatus.OK.value(), "Submission updated successfully.");
		}
	}

	@Transactional
	@PreAuthorize("hasAuthority('PARENT')")
	@DeleteMapping("/retract")
	public ApiResponse<String> retractSubmission(@RequestBody RegisterRequest regReq) {
		// Find submission -> Can Retract only if before "Enrolled"
		String parentEmail = regReq.getParentEmail();
		Optional<Parent> optParent = parentRepo.findByEmail(parentEmail);
		if (optParent.isEmpty()) {
			return ApiResponse.error(HttpStatus.NOT_FOUND.value(), Constants.PARENT_NOT_FOUND.getValue());
		}

		Parent parent = optParent.get();
		List<StudentRegistration> submissions = studentRegistrationRepo.findByParent(parent);
		Optional<StudentRegistration> submission = submissions.stream()
				.filter(sub -> sub.getStudent().getName().equals(regReq.getStudentName()) && !sub.getStatus().equals(RegistrationStatus.ENROLLED))
				.findFirst();

		if(submission.isEmpty()) {
			return ApiResponse.error(HttpStatus.NOT_FOUND.value(), "No matching submission found to retract.");
		}else {
			StudentRegistration sub = submission.get();
            studentRegistrationRepo.delete(sub);
            return ApiResponse.ok(HttpStatus.OK.value(), "Submission retracted successfully.");
		}
	}

	@Transactional
	@PreAuthorize("hasAuthority('PARENT')")
	@GetMapping("/submissions")
	public ApiResponse<List<Map<String, Object>>> getSubmissions(@RequestParam("parentEmail") String parentEmail) {

		Optional<Parent> optParent = parentRepo.findByEmail(parentEmail);
		if (optParent.isEmpty()) {
			return ApiResponse.error(HttpStatus.NOT_FOUND.value(), Constants.PARENT_NOT_FOUND.getValue());

		}else {
			Parent parent = optParent.get();
			List<StudentRegistration> submissions = studentRegistrationRepo.findByParent(parent);

			List<Map<String, Object>> studentList = new ArrayList<>();

			for (StudentRegistration sub : submissions) {
				Map<String, Object> studentSubmission = new HashMap<>();
				studentSubmission.put("studentName", sub.getStudent().getName());
				studentSubmission.put("studentMartialArt", sub.getStudent().getMartialArtsLevel());
				studentSubmission.put("studentCodingLevel", sub.getStudent().getCodingLevel());
				studentSubmission.put("registrationStatus", sub.getStatus().toString());
				studentSubmission.put("createdAt", sub.getCreatedAt());
				studentSubmission.put("updatedAt", sub.getUpdatedAt());
				studentList.add(studentSubmission);
			}
			return ApiResponse.ok(HttpStatus.OK.value(), studentList);
		}
	}

	private List<String> isValidStudent(RegisterRequest registerRequest) {
		List<String> invalidFields = new ArrayList<>(3);
		if (registerRequest.getStudentName() == null || registerRequest.getStudentName().trim().isEmpty()) {
			invalidFields.add("name");
		}
		if (registerRequest.getStudentMartialLevel() == null
				|| !isValidMartialArtsLevel(registerRequest.getStudentMartialLevel())) {
			invalidFields.add("martialArtsLevel");
		}
		if (registerRequest.getStudentCodingLevel() == null
				|| !isValidCodingLevel(registerRequest.getStudentCodingLevel())) {
			invalidFields.add("codingLevel");
		}
		return invalidFields;
	}

	private boolean isValidMartialArtsLevel(String martialArtsLevel) {
		for (MartialArtsLevel level : MartialArtsLevel.values()) {
			if (level.name().equalsIgnoreCase(martialArtsLevel)) {
				return true;
			}
		}
		return false;
	}

	private boolean isValidCodingLevel(String codingLevel) {
		for (CodingLevel level : CodingLevel.values()) {
			if (level.name().equalsIgnoreCase(codingLevel)) {
				return true;
			}
		}
		return false;
	}

}