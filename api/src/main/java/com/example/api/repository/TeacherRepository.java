package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.model.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long>{
    
}
