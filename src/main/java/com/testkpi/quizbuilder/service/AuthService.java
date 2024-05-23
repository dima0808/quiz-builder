package com.testkpi.quizbuilder.service;

import com.testkpi.quizbuilder.entity.User;
import com.testkpi.quizbuilder.payload.RegisterDto;
import com.testkpi.quizbuilder.payload.UserDto;

public interface AuthService {

    User register(RegisterDto registerDto);

    User findUserByUsername(String usernameOrEmail);

    User updateUser(User user);

    User updateUser(User existingUser, UserDto userDto);
}
