package com.testkpi.quizbuilder.controller;

import com.testkpi.quizbuilder.entity.User;
import com.testkpi.quizbuilder.entity.test.Mark;
import com.testkpi.quizbuilder.entity.test.Test;
import com.testkpi.quizbuilder.payload.MarkDto;
import com.testkpi.quizbuilder.payload.TestDto;
import com.testkpi.quizbuilder.response.OperationResponse;
import com.testkpi.quizbuilder.service.AuthService;
import com.testkpi.quizbuilder.service.MarkService;
import com.testkpi.quizbuilder.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final TestService testService;
    private final AuthService authService;
    private final MarkService markService;

    @Autowired
    public TestController(TestService testService, AuthService authService, MarkService markService) {
        this.testService = testService;
        this.authService = authService;
        this.markService = markService;
    }

    @GetMapping
    public List<Test> getAllTests() {
        return testService.findAllTests();
    }

    @GetMapping("/{testId}")
    public Test getTest(@PathVariable Long testId) {
        return testService.findTestById(testId);
    }

    @PostMapping(value = {"/add", "/create"})
    public ResponseEntity<OperationResponse> createTest(@RequestBody TestDto testDto) {
        testService.saveTest(testDto);
        OperationResponse testResponse = new OperationResponse(HttpStatus.CREATED.value(),
                "Test '" + testDto.getName() + "' has successfully created.", System.currentTimeMillis());
        return new ResponseEntity<>(testResponse, HttpStatus.CREATED);
    }

    @PutMapping("/{testId}/update")
    public ResponseEntity<OperationResponse> updateTest(@PathVariable Long testId, @RequestBody TestDto testDto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Test test = testService.findTestById(testId);

        if (!test.getAuthor().equals(username)) {
            return null;
        }

        testService.updateTest(testId, testDto);
        OperationResponse testResponse = new OperationResponse(HttpStatus.OK.value(),
                "Test '" + testDto.getName() + "' has successfully updated.", System.currentTimeMillis());
        return new ResponseEntity<>(testResponse, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping
    public ResponseEntity<OperationResponse> deleteAllTests() {
        testService.deleteAllTests();
        OperationResponse testResponse = new OperationResponse(HttpStatus.OK.value(),
                "All tests deleted successfully.", System.currentTimeMillis());
        return new ResponseEntity<>(testResponse, HttpStatus.OK);
    }

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

    @GetMapping("/passed")
    public Map<Long, Integer> getAllPassedTests() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = authService.findUserByUsername(username);

        Map<Long, Integer> userPassedTests = new HashMap<>();
        for (Mark mark : markService.findAllByUser(user)) {
            userPassedTests.put(mark.getTest().getId(), mark.getMark());
        }

        return userPassedTests;
    }

    @PostMapping(value = {"/{testId}/pass", "/{testId}/complete"})
    public ResponseEntity<OperationResponse> passTest(@PathVariable Long testId, @RequestBody Integer mark) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = authService.findUserByUsername(username);
        Test test = testService.findTestById(testId);

        MarkDto markDto = MarkDto.builder()
                .user(user)
                .test(test)
                .mark(mark).build();
        markService.save(markDto);
        OperationResponse testResponse = new OperationResponse(HttpStatus.OK.value(),
                "Test '" + test.getName() + "' has been passed.", System.currentTimeMillis());
        return new ResponseEntity<>(testResponse, HttpStatus.OK);
    }

    @GetMapping(value = {"/{testId}/statistics", "/{testId}/stats"})
    public Map<String, Integer> getTestStatistics(@PathVariable Long testId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Test test = testService.findTestById(testId);

        if (!test.getAuthor().equals(username)) {
            return null;
        }

        Map<String, Integer> testStatistics = new HashMap<>();
        for (Mark mark : markService.findAllByTest(test)) {
            testStatistics.put(mark.getUser().getUsername(), mark.getMark());
        }

        return testStatistics;
    }

    @DeleteMapping(value = {"/{testId}/statistics/{usernameByAttempt}", "/{testId}/stats/{usernameByAttempt}"})
    public ResponseEntity<OperationResponse> deleteUserAttempt(@PathVariable Long testId,
                                                               @PathVariable String usernameByAttempt) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Test test = testService.findTestById(testId);

        if (!test.getAuthor().equals(username)) {
            return null;
        }

        markService.deleteByTestAndUser(test, authService.findUserByUsername(usernameByAttempt));

        OperationResponse testResponse = new OperationResponse(HttpStatus.OK.value(),
                usernameByAttempt + "'s attempt deleted successfully.", System.currentTimeMillis());
        return new ResponseEntity<>(testResponse, HttpStatus.OK);
    }
}
