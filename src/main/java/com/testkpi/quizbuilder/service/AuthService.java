package com.testkpi.quizbuilder.service;

import com.testkpi.quizbuilder.payload.LoginDto;

public interface AuthService {

    public String login(LoginDto loginDto);
}
