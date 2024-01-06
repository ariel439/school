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
import com.example.api.model.Teacher;
import com.example.api.service.TeacherService;

@RestController
@RequestMapping("/teacher")
@CrossOrigin(origins = "*")
public class TeacherController {

    @Autowired
    private TeacherService service;

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Response> remove(@PathVariable long id){
        return service.remove(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody Teacher t) {
        return service.registerUpdate(t, "update");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Teacher t) {
        return service.registerUpdate(t, "register");
    }
    
    @GetMapping("/list")
    public Iterable<Teacher> list(){
        return service.list();
    }
}
