package com.novelreading.novelreading_backend.mapper;

import com.novelreading.novelreading_backend.dto.UserDTO;
import com.novelreading.novelreading_backend.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    @Autowired
    private ModelMapper modelMapper;

    public UserDTO maptoUserDto(User user){
        UserDTO userDTO = modelMapper.map(user,UserDTO.class);
        return userDTO;
    }

    public User maptoUser(UserDTO userDTO){
        User user = modelMapper.map(userDTO,User.class);
        return user;
    }
}
