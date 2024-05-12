package com.testkpi.quizbuilder.service;

import com.testkpi.quizbuilder.entity.User;
import com.testkpi.quizbuilder.payload.RegisterDto;

public interface AuthService {

    User register(RegisterDto registerDto);

    User findUserByUsername(String usernameOrEmail);

    User updateUser(User user);
}
