package com.testkpi.quizbuilder.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public String getAdminPanel() {
        return "some admin things";
    }
}
