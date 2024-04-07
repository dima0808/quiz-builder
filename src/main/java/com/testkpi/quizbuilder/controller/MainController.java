package com.testkpi.quizbuilder.controller;

import com.testkpi.quizbuilder.response.PageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MainController {

    @GetMapping("/home")
    public ResponseEntity<PageResponse> getHomePage() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        PageResponse pageResponse = new PageResponse(HttpStatus.OK.value(), username, System.currentTimeMillis());
        return new ResponseEntity<>(pageResponse, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public String getAdminPanel() {
        return "some admin things";
    }
}
