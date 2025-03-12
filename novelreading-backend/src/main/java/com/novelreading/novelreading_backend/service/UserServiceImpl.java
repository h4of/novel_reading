package com.novelreading.novelreading_backend.service;

import com.novelreading.novelreading_backend.model.User;
import com.novelreading.novelreading_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmailAndPassword(String email,String password) {
        return userRepository.findByEmailAndPassword(email,password);
    }
}
