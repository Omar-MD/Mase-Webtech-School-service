package com.tus.schoolservice.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
import com.tus.schoolservice.request.UpdateStatusRequest;
import com.tus.schoolservice.response.ApiResponse;
import com.tus.schoolservice.service.ValidationService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/registration")
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

	/**
	 * PARENT QUERIES
	 */

	@Transactional
	@PreAuthorize("hasAuthority('PARENT')")
	@PostMapping("/submit")
	public ApiResponse<RegistrationStatus> submitRegistration(@RequestBody RegisterRequest regReq) {
		// Student Validation
		List<String> invalidFields = ValidationService.isValidStudent(regReq);
		if (!invalidFields.isEmpty()) {
			return ApiResponse.error(HttpStatus.BAD_REQUEST.value(),
					Constants.INVALID_STUDENT_DETAIL.getValue() + invalidFields);
		}

		// Parent Validation
		String parentName = regReq.getParentName();
		Optional<Parent> parent = parentRepo.findByName(parentName);
		if (parent.isEmpty()) {
			return ApiResponse.error(HttpStatus.NOT_FOUND.value(), Constants.PARENT_NOT_FOUND.getValue());
		}

		// Create Student
		Student newStudent = new Student(regReq.getStudentName(), regReq.getStudentMartialLevel(),
				regReq.getStudentCodingLevel(), regReq.getStudentDateOfBirth(), regReq.getStudentGender(),
				regReq.getStudentMedicalInformation());
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
		List<String> invalidFields = ValidationService.isValidStudent(regReq);
		if (!invalidFields.isEmpty()) {
			return ApiResponse.error(HttpStatus.BAD_REQUEST.value(),
					Constants.INVALID_STUDENT_DETAIL.getValue() + invalidFields);
		}

		// Find submission -> Can Only Edit before its reviewed
		String parentName = regReq.getParentName();
		Optional<Parent> optParent = parentRepo.findByName(parentName);
		if (optParent.isEmpty()) {
			return ApiResponse.error(HttpStatus.NOT_FOUND.value(), Constants.PARENT_NOT_FOUND.getValue());
		}

		Parent parent = optParent.get();
		List<StudentRegistration> submissions = studentRegistrationRepo.findByParent(parent);
		Optional<StudentRegistration> submission = submissions.stream()
				.filter(sub -> sub.getStudent().getName().equals(regReq.getStudentName())
						&& sub.getStatus().equals(RegistrationStatus.SUBMITTED))
				.findFirst();

		if (submission.isEmpty()) {
			return ApiResponse.error(HttpStatus.NOT_FOUND.value(), "No matching submission found to update.");
		} else {
			StudentRegistration sub = submission.get();
			// Update submission details
			sub.getStudent().setName(regReq.getStudentName());
			sub.getStudent().setMartialArtsLevel(regReq.getStudentMartialLevel());
			sub.getStudent().setCodingLevel(regReq.getStudentCodingLevel());
			sub.setUpdatedAt(LocalDate.now());
			studentRegistrationRepo.save(sub);
			return ApiResponse.ok(HttpStatus.OK.value(), "Submission updated successfully.");
		}
	}

	@Transactional
	@PreAuthorize("hasAuthority('PARENT')")
	@DeleteMapping("/retract")
	public ApiResponse<String> retractSubmission(@RequestParam("submissionID") Long submissionID) {
		List<StudentRegistration> submissions = studentRegistrationRepo.findAll();
		Optional<StudentRegistration> submission = submissions.stream()
				.filter(sub -> sub.getId().equals(submissionID) && !sub.getStatus().equals(RegistrationStatus.ENROLLED))
				.findFirst();

		if (submission.isEmpty()) {
			return ApiResponse.error(HttpStatus.NOT_FOUND.value(), "No matching submission found to retract.");
		} else {
			StudentRegistration sub = submission.get();
			studentRegistrationRepo.delete(sub);
			return ApiResponse.ok(HttpStatus.OK.value(), "Submission retracted successfully.");
		}
	}

	@Transactional
	@PreAuthorize("hasAuthority('PARENT')")
	@GetMapping("/submission")
	public ApiResponse<List<Map<String, Object>>> getSubmissions(@RequestParam("parentName") String parentName) {

		Optional<Parent> optParent = parentRepo.findByName(parentName);
		if (optParent.isEmpty()) {
			return ApiResponse.error(HttpStatus.NOT_FOUND.value(), Constants.PARENT_NOT_FOUND.getValue());

		} else {
			Parent parent = optParent.get();
			List<StudentRegistration> submissions = studentRegistrationRepo.findByParent(parent);

			List<Map<String, Object>> studentList = new ArrayList<>();

			for (StudentRegistration sub : submissions) {
				Map<String, Object> studentSubmission = new HashMap<>();
				studentSubmission.put("submissionId", sub.getId());
				studentSubmission.put("studentName", sub.getStudent().getName());
				studentSubmission.put("studentMartialArt", sub.getStudent().getMartialArtsLevel());
				studentSubmission.put("studentCodingLevel", sub.getStudent().getCodingLevel());
				studentSubmission.put("studentDateOfBirth", sub.getStudent().getDateOfBirth());
				studentSubmission.put("studentGender", sub.getStudent().getGender());
				studentSubmission.put("studentMedicalInfo", sub.getStudent().getMedicalInformation());
				studentSubmission.put("registrationStatus", sub.getStatus().toString());
				studentSubmission.put("createdAt", sub.getCreatedAt());
				studentSubmission.put("updatedAt", sub.getUpdatedAt());
				studentList.add(studentSubmission);
			}
			return ApiResponse.ok(HttpStatus.OK.value(), studentList);
		}
	}

	/**
	 * ADMIN QUERIES
	 */
	@Transactional
	@PreAuthorize("hasAuthority('ADMIN')")
	@PutMapping("/status-update")
	public ApiResponse<String> updateSubmissionStatus(@RequestBody UpdateStatusRequest updateReq) {
		Optional<StudentRegistration> submission = studentRegistrationRepo.findById(updateReq.getId());
		if (submission.isEmpty()) {
			return ApiResponse.error(HttpStatus.NOT_FOUND.value(), "No matching submission found to update.");
		} else {
			StudentRegistration sub = submission.get();
			sub.setStatus(updateReq.getNewStatus());
			sub.setUpdatedAt(LocalDate.now());
			studentRegistrationRepo.save(sub);
			return ApiResponse.ok(HttpStatus.OK.value(), "Submission updated successfully.");
		}
	}

	@Transactional
	@PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping("/students")
	public ApiResponse<List<Map<String, Object>>> getAllStudents() {
		List<StudentRegistration> submissions = studentRegistrationRepo.findAll();
		List<Map<String, Object>> studentList = new ArrayList<>();

		for (StudentRegistration sub : submissions) {
			Map<String, Object> studentSubmission = new HashMap<>();
			studentSubmission.put("submission_id", sub.getId());
			studentSubmission.put("submission_status", sub.getStatus());
			studentSubmission.put("submission_createdAt", sub.getCreatedAt());
			studentSubmission.put("submission_updatedAt", sub.getUpdatedAt());
			studentSubmission.put("parent_id", sub.getParent().getId());
			studentSubmission.put("parent_email", sub.getParent().getEmail());
			studentSubmission.put("parent_name", sub.getParent().getName());
			studentSubmission.put("student_id", sub.getStudent().getId());
			studentSubmission.put("student_dob", sub.getStudent().getDateOfBirth());
			studentSubmission.put("student_name", sub.getStudent().getName());
			studentSubmission.put("student_gender", sub.getStudent().getGender());
			studentSubmission.put("student_martial", sub.getStudent().getMartialArtsLevel());
			studentSubmission.put("student_coding", sub.getStudent().getCodingLevel());
			studentSubmission.put("student_medical_info", sub.getStudent().getMedicalInformation());
			studentList.add(studentSubmission);
		}
		return ApiResponse.ok(HttpStatus.OK.value(), studentList);
	}

	@Transactional
	@PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping("/status/{status}")
	public ApiResponse<Object> getSubmissionByStatus(@PathVariable("status") RegistrationStatus status) {
		List<StudentRegistration> submissions = studentRegistrationRepo.findByStatus(status);
		List<Map<String, Object>> studentList = new ArrayList<>();

		for (StudentRegistration sub : submissions) {
			Map<String, Object> studentSubmission = new HashMap<>();
			studentSubmission.put("dob", sub.getStudent().getDateOfBirth());
			studentSubmission.put("parent_email", sub.getParent().getEmail());
			studentSubmission.put("name", sub.getStudent().getName());
			studentSubmission.put("gender", sub.getStudent().getGender());
			studentSubmission.put("martial", sub.getStudent().getMartialArtsLevel());
			studentSubmission.put("coding", sub.getStudent().getCodingLevel());
			studentList.add(studentSubmission);
		}
		return ApiResponse.ok(HttpStatus.OK.value(), studentList);
	}

	@Transactional
	@PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping("/martial/{martialLevel}")
	public ApiResponse<Object> getSubmissionByMartial(@PathVariable("martialLevel") MartialArtsLevel martialLevel) {
		List<StudentRegistration> submissions = studentRegistrationRepo.findByMartialLevel(martialLevel.toString());
		List<Map<String, Object>> studentList = new ArrayList<>();

		for (StudentRegistration sub : submissions) {
			Map<String, Object> studentSubmission = new HashMap<>();
			studentSubmission.put("dob", sub.getStudent().getDateOfBirth());
			studentSubmission.put("name", sub.getStudent().getName());
			studentSubmission.put("gender", sub.getStudent().getGender());
			studentSubmission.put("martial", sub.getStudent().getMartialArtsLevel());
			studentSubmission.put("coding", sub.getStudent().getCodingLevel());
			studentList.add(studentSubmission);
		}
		return ApiResponse.ok(HttpStatus.OK.value(), studentList);
	}

	@Transactional
	@PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping("/code/{codingLevel}")
	public ApiResponse<Object> getSubmissionByCode(@PathVariable("codingLevel") CodingLevel codingLevel) {
		List<StudentRegistration> submissions = studentRegistrationRepo.findByCodingLevel(codingLevel.toString());
		List<Map<String, Object>> studentList = new ArrayList<>();

		for (StudentRegistration sub : submissions) {
			Map<String, Object> studentSubmission = new HashMap<>();
			studentSubmission.put("dob", sub.getStudent().getDateOfBirth());
			studentSubmission.put("name", sub.getStudent().getName());
			studentSubmission.put("gender", sub.getStudent().getGender());
			studentSubmission.put("martial", sub.getStudent().getMartialArtsLevel());
			studentSubmission.put("coding", sub.getStudent().getCodingLevel());
			studentList.add(studentSubmission);
		}
		return ApiResponse.ok(HttpStatus.OK.value(), studentList);
	}


	@Transactional
	@PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping("/parent/{parentID}")
	public ApiResponse<Object> getSubmissionByStatus(@PathVariable("parentID") Long parentID) {
		Optional<Parent> optParent = parentRepo.findById(parentID);
		if (optParent.isEmpty()) {
			return ApiResponse.error(HttpStatus.NOT_FOUND.value(), Constants.PARENT_NOT_FOUND.getValue());

		} else {
			Parent parent = optParent.get();
			List<StudentRegistration> submissions = studentRegistrationRepo.findByParent(parent);
			List<Map<String, Object>> studentList = new ArrayList<>();

			for (StudentRegistration sub : submissions) {
				Map<String, Object> studentSubmission = new HashMap<>();
				studentSubmission.put("dob", sub.getStudent().getDateOfBirth());
				studentSubmission.put("status", sub.getStatus());
				studentSubmission.put("name", sub.getStudent().getName());
				studentSubmission.put("gender", sub.getStudent().getGender());
				studentSubmission.put("martial", sub.getStudent().getMartialArtsLevel());
				studentSubmission.put("coding", sub.getStudent().getCodingLevel());
				studentList.add(studentSubmission);
			}
			return ApiResponse.ok(HttpStatus.OK.value(), studentList);
		}
	}
}