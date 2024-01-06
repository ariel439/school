package com.example.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.api.model.Classroom;
import com.example.api.model.Response;
import com.example.api.repository.ClassroomRepository;

@Service
public class ClassroomService {
    
    @Autowired
    private ClassroomRepository repository;

    @Autowired
    private Response resp;

    public Iterable<Classroom> list() {
        return repository.findAll();
    }

    public Optional<Classroom> findById(Long id) {
        return repository.findById(id);
    }

    public ResponseEntity<?> registerUpdate(Classroom c, String action) {

        if(c.getName().equals("")){
            resp.setMsg("Name is mandatory.");
            return new ResponseEntity<Response>(resp, HttpStatus.BAD_REQUEST);
        }else{
            if(action.equals("register")){
                return new ResponseEntity<Classroom>(repository.save(c), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<Classroom>(repository.save(c), HttpStatus.OK);
            }
        }
    }

    public ResponseEntity<Response> remove(long id){
        repository.deleteById(id);
        resp.setMsg("Classroom was removed!");
        return new ResponseEntity<Response>(resp, HttpStatus.OK);
    }
}
