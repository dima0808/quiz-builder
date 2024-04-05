package com.testkpi.quizbuilder.controller;

import com.testkpi.quizbuilder.payload.RegisterDto;
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

    @PostMapping(value = {"/register", "/signup"})
    public ResponseEntity<String> getLoginPage(@RequestBody RegisterDto registerDto) {
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
