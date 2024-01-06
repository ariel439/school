package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.model.Classroom;
import java.util.Optional;


public interface ClassroomRepository extends JpaRepository<Classroom, Long>{
    
    Optional<Classroom> findById(Long id);
}
