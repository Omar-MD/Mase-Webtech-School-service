package com.tus.schoolservice.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tus.schoolservice.dto.Parent;
import com.tus.schoolservice.dto.student.RegistrationStatus;
import com.tus.schoolservice.dto.student.StudentRegistration;

@Repository
public interface StudentRegistrationRepo extends JpaRepository<StudentRegistration, Long>{
	List<StudentRegistration> findByParent(Parent parent);
	List<StudentRegistration> findByStatus(RegistrationStatus status);
}
