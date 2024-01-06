package com.example.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.api.model.Response;
import com.example.api.model.Student;
import com.example.api.repository.StudentRepository;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository repository;

    @Autowired
    private Response resp;

    public Iterable<Student> list() {
        return repository.findAll();
    }

    public ResponseEntity<?> registerUpdate(Student s, String action) {

        if(s.getName().equals("")){
            resp.setMsg("Name is mandatory.");
            return new ResponseEntity<Response>(resp, HttpStatus.BAD_REQUEST);
        }else{
            if(action.equals("register")){
                return new ResponseEntity<Student>(repository.save(s), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<Student>(repository.save(s), HttpStatus.OK);
            }
        }
    }

    public ResponseEntity<Response> remove(long id){
        repository.deleteById(id);
        resp.setMsg("Student was removed!");
        return new ResponseEntity<Response>(resp, HttpStatus.OK);
    }
}
