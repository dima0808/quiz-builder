package com.testkpi.quizbuilder.controller;

import com.testkpi.quizbuilder.entity.User;
import com.testkpi.quizbuilder.entity.test.Test;
import com.testkpi.quizbuilder.payload.TestDto;
import com.testkpi.quizbuilder.response.OperationResponse;
import com.testkpi.quizbuilder.service.AuthService;
import com.testkpi.quizbuilder.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final TestService testService;
    private final AuthService authService;

    @Autowired
    public TestController(TestService testService, AuthService authService) {
        this.testService = testService;
        this.authService = authService;
    }

    @GetMapping
    public List<Test> getAllTests() {
        return testService.findAllTests();
    }

    @GetMapping("/{id}")
    public Test getTest(@PathVariable Long id) {
        return testService.findTestById(id);
    }

    @PostMapping(value = {"/add", "/create"})
    public ResponseEntity<OperationResponse> createTest(@RequestBody TestDto testDto) {
        testService.saveTest(testDto);
        OperationResponse testResponse = new OperationResponse(HttpStatus.CREATED.value(),
                "Test '" + testDto.getName() + "' has successfully created.", System.currentTimeMillis());
        return new ResponseEntity<>(testResponse, HttpStatus.CREATED);
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping
    public ResponseEntity<OperationResponse> deleteAllTests() {
        testService.deleteAllTests();
        OperationResponse testResponse = new OperationResponse(HttpStatus.OK.value(),
                "All tests deleted successfully.", System.currentTimeMillis());
        return new ResponseEntity<>(testResponse, HttpStatus.OK);
    }

    //    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{testId}")
    public ResponseEntity<OperationResponse> deleteTest(@PathVariable Long testId) {
        testService.deleteById(testId);
        OperationResponse testResponse = new OperationResponse(HttpStatus.OK.value(),
                "Test with id " + testId + " deleted successfully.", System.currentTimeMillis());
        return new ResponseEntity<>(testResponse, HttpStatus.OK);
    }

    @GetMapping("/liked")
    public List<Test> getAllLikedTests() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = authService.findUserByUsername(username);
        return user.getLikedTests();
    }

    @PatchMapping("/like/{testId}")
    public ResponseEntity<OperationResponse> addLikedTest(@PathVariable Long testId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = authService.findUserByUsername(username);
        Test test = testService.findTestById(testId);
        user.addLikedTest(test);
        authService.updateUser(user);
        OperationResponse testResponse = new OperationResponse(HttpStatus.OK.value(),
                "Test '" + test.getName() + "' has been added to favorites.", System.currentTimeMillis());
        return new ResponseEntity<>(testResponse, HttpStatus.OK);
    }

    @PatchMapping("/dislike/{testId}")
    public ResponseEntity<OperationResponse> removeLikedTest(@PathVariable Long testId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = authService.findUserByUsername(username);
        Test test = testService.findTestById(testId);
        user.removeLikedTest(test);
        authService.updateUser(user);
        OperationResponse testResponse = new OperationResponse(HttpStatus.OK.value(),
                "Test '" + test.getName() + "' has been removed from favorites.", System.currentTimeMillis());
        return new ResponseEntity<>(testResponse, HttpStatus.OK);
    }
}
