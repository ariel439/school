package com.example.api.controller;

import java.util.Optional;

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

import com.example.api.model.Classroom;
import com.example.api.model.Response;
import com.example.api.service.ClassroomService;

@RestController
@RequestMapping("/classroom")
@CrossOrigin(origins = "*")
public class ClassroomController {
    
    @Autowired
    private ClassroomService service;

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Response> remove(@PathVariable long id){
        return service.remove(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody Classroom c) {
        return service.registerUpdate(c, "update");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Classroom c) {
        return service.registerUpdate(c, "register");
    }

    @GetMapping("/list")
    public Iterable<Classroom> list(){
        return service.list();
    }

    @GetMapping("/list/{id}")
    public Optional<Classroom> findById(@PathVariable Long id){
        return service.findById(id);
    }
}
