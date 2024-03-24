package com.tus.schoolservice.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tus.schoolservice.dto.Parent;

@Repository
public interface ParentRepo  extends JpaRepository<Parent, Long>{

//	@Query(value="SELECT * FROM parents p INNER JOIN users u ON u.id = p.id WHERE p.name = ")
	Optional<Parent> findByEmail(String email);
	Optional<Parent> findByName(String name);
}
