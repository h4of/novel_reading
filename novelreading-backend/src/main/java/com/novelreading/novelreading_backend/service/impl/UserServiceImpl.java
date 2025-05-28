package com.novelreading.novelreading_backend.service.impl;

import com.novelreading.novelreading_backend.dto.UserDTO;
import com.novelreading.novelreading_backend.entity.Role;
import com.novelreading.novelreading_backend.entity.User;
import com.novelreading.novelreading_backend.exception.ResourceNotFound;
import com.novelreading.novelreading_backend.mapper.UserMapper;
import com.novelreading.novelreading_backend.repository.UserRepository;
import com.novelreading.novelreading_backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Override
    public ResponseEntity<String> saveUser(UserDTO userDTO) {
        User user = userMapper.maptoUser(userDTO);
        Optional<User> existingEmail = userRepository.findByEmail(userDTO.getEmail());

        if(existingEmail.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is existed");
        }


        if (user.getRole()==null){
            user.setRole(Role.USER);
        }

        if(userDTO.getName() == null){
            String name = "User"+user.getUserID();
            user.setName(name);
        }

        userRepository.save(user);
        return ResponseEntity.ok("Đăng ký thành công");
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(()-> new ResourceNotFound("Not found"));
        userRepository.delete(user);
    }

    @Override
    public ResponseEntity<String> login(UserDTO userDTO, HttpSession session) {
        User user = userRepository.findByEmailAndPassword(userDTO.getEmail(),userDTO.getPassword());
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(user, null, List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole())));
        SecurityContextHolder.getContext().setAuthentication(authToken);
        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
        if(user != null){
            session.setAttribute("user",user);
            return ResponseEntity.ok("Login successful");
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email or password is invalid");
        }
    }

    @Override
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session != null){
            session.invalidate();
        }
        return ResponseEntity.ok("Logout successful");
    }

    @Override
    public ResponseEntity<String> updateUser(Long id, UserDTO updateUser) {
        User user = userRepository.findById(id).orElseThrow(()-> new ResourceNotFound("User is not existed"));

        if(updateUser.getName() != null) {
            user.setName(updateUser.getName());
        }

        if(updateUser.getEmail() != null){
            user.setEmail((updateUser.getEmail()));
        }

        if(updateUser.getPassword() != null) {
            user.setPassword(updateUser.getPassword());
        }
        if(updateUser.getRole() != null){
            user.setRole(updateUser.getRole());
        }

        userRepository.save(user);
        return ResponseEntity.ok("Cập nhật thành công");
    }

    @Override
    public Page<UserDTO> getAllUser(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return users.map(user -> userMapper.maptoUserDto(user));
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(()-> new ResourceNotFound("User is not existed"));
        return userMapper.maptoUserDto(user);
    }

    public UserDTO getUserByID(Long id){
        User user = userRepository.findById(id).orElseThrow(()-> new ResourceNotFound("User is not existed"));
        return userMapper.maptoUserDto(user);
    }
}
