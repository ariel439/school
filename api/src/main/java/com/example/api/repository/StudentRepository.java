package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long>{
    
}
