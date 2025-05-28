package com.novelreading.novelreading_backend.service;

import com.novelreading.novelreading_backend.dto.UserDTO;
import com.novelreading.novelreading_backend.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    public ResponseEntity<String> saveUser(UserDTO userDTO);

    public ResponseEntity<String> login(UserDTO userDTO, HttpSession session);

    public ResponseEntity<String> logout(HttpServletRequest request);

    public ResponseEntity<String> updateUser(Long id,UserDTO updateUser);

    public Page<UserDTO> getAllUser(Pageable pageable);

    public UserDTO getUserByID(Long id);

    public UserDTO getUserByEmail(String email);

    public void deleteUser(Long id);
}
