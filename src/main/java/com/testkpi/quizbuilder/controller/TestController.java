package com.testkpi.quizbuilder.controller;

import com.testkpi.quizbuilder.entity.test.Test;
import com.testkpi.quizbuilder.payload.TestDto;
import com.testkpi.quizbuilder.response.OperationResponse;
import com.testkpi.quizbuilder.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final TestService testService;

    @Autowired
    public TestController(TestService testService) {
        this.testService = testService;
    }

    @GetMapping
    public List<Test> getAllTests() {
        return testService.findAllTests();
    }

    @PostMapping(value = {"/add", "/create"})
    public ResponseEntity<OperationResponse> createTest(@RequestBody TestDto testDto) {
        testService.saveTest(testDto);
        OperationResponse testResponse = new OperationResponse(HttpStatus.CREATED.value(),
                "Test '" + testDto.getName() + "' has successfully created.", System.currentTimeMillis());
        return new ResponseEntity<>(testResponse, HttpStatus.CREATED);
    }
}
