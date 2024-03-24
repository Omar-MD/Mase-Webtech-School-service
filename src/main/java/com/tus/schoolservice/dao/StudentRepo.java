package com.tus.schoolservice.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tus.schoolservice.dto.student.CodingLevel;
import com.tus.schoolservice.dto.student.MartialArtsLevel;
import com.tus.schoolservice.dto.student.Student;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long>{
	Optional<Student> findByName(String name);
	Optional<Student> findByMartialArtsLevel(MartialArtsLevel martialLevel);
	Optional<Student> findByCodingLevel(CodingLevel codingLevel);
}
