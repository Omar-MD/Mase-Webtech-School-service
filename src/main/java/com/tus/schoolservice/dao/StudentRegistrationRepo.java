package com.tus.schoolservice.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tus.schoolservice.dto.Parent;
import com.tus.schoolservice.dto.student.RegistrationStatus;
import com.tus.schoolservice.dto.student.StudentRegistration;

@Repository
public interface StudentRegistrationRepo extends JpaRepository<StudentRegistration, Long> {
	List<StudentRegistration> findByParent(Parent parent);
	List<StudentRegistration> findByStatus(RegistrationStatus status);

	@Query(value="SELECT sr.* FROM student_registrations sr " +
	        "INNER JOIN students s ON s.id = sr.student_id " +
	        "WHERE s.martial_arts_level = :martialArtsLevel", nativeQuery = true)
	List<StudentRegistration> findByMartialLevel(@Param("martialArtsLevel") String martialArtsLevel);

	@Query(value="SELECT sr.* FROM student_registrations sr " +
	        "INNER JOIN students s ON s.id = sr.student_id " +
	        "WHERE s.coding_level = :codingLevel", nativeQuery = true)
	List<StudentRegistration> findByCodingLevel(@Param("codingLevel") String codingLevel);
}
