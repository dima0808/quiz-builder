package com.testkpi.quizbuilder.service;

import com.testkpi.quizbuilder.payload.RegisterDto;

public interface AuthService {

    public String register(RegisterDto registerDto);
}
