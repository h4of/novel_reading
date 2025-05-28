package com.novelreading.novelreading_backend.controller;

import com.novelreading.novelreading_backend.dto.UserDTO;
import com.novelreading.novelreading_backend.entity.Role;
import com.novelreading.novelreading_backend.entity.User;
import com.novelreading.novelreading_backend.mapper.UserMapper;
import com.novelreading.novelreading_backend.security.CustomUserDetailService;
import com.novelreading.novelreading_backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;


//    @Autowired
//    private PasswordEncoder passwordEncoder;
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDTO userDTO){
        return userService.saveUser(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO, HttpSession session){
        return userService.login(userDTO,session);
    }

    @GetMapping("/user/current-user")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal User user){
        UserDTO userDTO = userService.getUserByEmail(user.getEmail());
        userDTO.setPassword(null);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/user/logout")
    public ResponseEntity<String> logout(HttpServletRequest request){
        return userService.logout(request);
    }

    @GetMapping("/admin/user/getAll")
    public Page<UserDTO> getAll(@RequestParam(defaultValue = "0") int page,
                                @RequestParam(defaultValue = "12") int size){
        Pageable pageable = PageRequest.of(page,size);
        return userService.getAllUser(pageable);
    }

    @GetMapping("/admin/user/find/{id}")
    public UserDTO getUserByID(@PathVariable("id")Long id){
        return userService.getUserByID(id);
    }

    @PutMapping("/user/update/{id}")
    public ResponseEntity<String> update(@PathVariable("id") Long id, @RequestBody UserDTO userDTO ){
        return userService.updateUser(id,userDTO);
    }

    @DeleteMapping("/admin/user/delete/{id}")
    public void deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
    }
}
