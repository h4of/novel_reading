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
        Optional<User> existingEmail = userRepository.findByEmail(user.getEmail());
        try{
            existingEmail.isPresent();
        }catch (Exception e){

        }
        return userRepository.save(user);
    }

    @Override
    public String getUserName(User user) {
        return user.getUser_name();
    }

    @Override
    public String userLogin(User user) {
        Optional<User>
    }
}
