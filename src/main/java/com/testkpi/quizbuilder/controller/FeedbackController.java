package com.testkpi.quizbuilder.controller;

import com.testkpi.quizbuilder.entity.Feedback;
import com.testkpi.quizbuilder.payload.FeedbackDto;
import com.testkpi.quizbuilder.response.OperationResponse;
import com.testkpi.quizbuilder.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllQuestions() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(feedbackService.findAllQuestionsByUsername(username));
    }

    @PostMapping(value = {"/add", "/create"})
    public ResponseEntity<OperationResponse> addQuestion(@RequestBody FeedbackDto feedbackDto) {
        feedbackService.saveQuestion(feedbackDto);
        OperationResponse feedbackResponse = new OperationResponse(HttpStatus.CREATED.value(),
                "Question has been sent to the administration.", System.currentTimeMillis());
        return new ResponseEntity<>(feedbackResponse, HttpStatus.CREATED);
    }
}
