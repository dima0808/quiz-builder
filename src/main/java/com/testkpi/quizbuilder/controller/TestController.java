package com.testkpi.quizbuilder.controller;

import com.testkpi.quizbuilder.payload.TestDto;
import com.testkpi.quizbuilder.response.OperationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @PostMapping(value = {"/add", "/create"})
    public ResponseEntity<OperationResponse> createTest(@RequestBody TestDto testDto) {

        System.out.println(testDto);

        OperationResponse testResponse = new OperationResponse(HttpStatus.CREATED.value(),
                "Test \"" + testDto.getName() + "\" has successfully created.", System.currentTimeMillis());
        return new ResponseEntity<>(testResponse, HttpStatus.CREATED);
    }
}
