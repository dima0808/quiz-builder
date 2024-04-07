package com.testkpi.quizbuilder.controller;

import com.testkpi.quizbuilder.payload.RegisterDto;
import com.testkpi.quizbuilder.response.UserResponse;
import com.testkpi.quizbuilder.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping(value = {"/login", "/signin"})
    public String getLoginPage() {
        return "login-form";
    }

    @PostMapping(value = {"/api/register", "/api/signup"})
    public ResponseEntity<UserResponse> getLoginPage(@RequestBody RegisterDto registerDto) {
        authService.register(registerDto);
        UserResponse userResponse = new UserResponse(HttpStatus.CREATED.value(),
                "User " + registerDto.getUsername() + " has successfully created.", System.currentTimeMillis());
        return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
    }
}
