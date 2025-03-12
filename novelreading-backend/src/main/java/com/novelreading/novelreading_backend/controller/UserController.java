package com.novelreading.novelreading_backend.controller;

import com.novelreading.novelreading_backend.model.User;
import com.novelreading.novelreading_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/add")
    public User saveUser(User user){
        return userService.saveUser(user);
    }
     @PostMapping("/login")
    public Optional<User> findByEmailAndPassword(String email, String password){
        return userService.findByEmailAndPassword(email, password);
     }
}
