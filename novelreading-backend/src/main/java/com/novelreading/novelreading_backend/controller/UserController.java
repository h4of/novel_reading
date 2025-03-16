package com.novelreading.novelreading_backend.controller;

import com.novelreading.novelreading_backend.model.User;
import com.novelreading.novelreading_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/add")
    public User saveUser(@RequestBody User user){
        return userService.saveUser(user);
    }
    @GetMapping("/getName")
    public String getUserName(@RequestBody User user){
        return userService.getUserName(user);
    }
}
