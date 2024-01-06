package com.example.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.api.model.Response;
import com.example.api.model.Teacher;
import com.example.api.repository.TeacherRepository;

@Service
public class TeacherService {
    
    @Autowired
    private TeacherRepository repository;

    @Autowired
    private Response resp;

    public Iterable<Teacher> list() {
        return repository.findAll();
    }

     public ResponseEntity<?> registerUpdate(Teacher t, String action) {

        if(t.getName().equals("")){
            resp.setMsg("Name is mandatory.");
            return new ResponseEntity<Response>(resp, HttpStatus.BAD_REQUEST);
        }else{
            if(action.equals("register")){
                return new ResponseEntity<Teacher>(repository.save(t), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<Teacher>(repository.save(t), HttpStatus.OK);
            }
        }
    }

    public ResponseEntity<Response> remove(long id){
        repository.deleteById(id);
        resp.setMsg("Teacher was removed!");
        return new ResponseEntity<Response>(resp, HttpStatus.OK);
    }
}
