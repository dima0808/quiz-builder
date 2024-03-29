package com.testkpi.quizbuilder.service.impl;

import com.testkpi.quizbuilder.payload.LoginDto;
import com.testkpi.quizbuilder.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    public AuthServiceImpl(AuthenticationManager authenticationManager) {
//        this.authenticationManager = authenticationManager;
//    }

    @Override
    public String login(LoginDto loginDto) {
        return null;
    }
}
