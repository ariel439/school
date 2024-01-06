package com.example.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.model.Response;
import com.example.api.model.Student;
import com.example.api.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "*")
public class StudentController {
    
    @Autowired
    private StudentService service;

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Response> remove(@PathVariable long id){
        return service.remove(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody Student s) {
        return service.registerUpdate(s, "update");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Student s) {
        return service.registerUpdate(s, "register");
    }

    @GetMapping("/list")
    public Iterable<Student> list(){
        return service.list();
    }
}
