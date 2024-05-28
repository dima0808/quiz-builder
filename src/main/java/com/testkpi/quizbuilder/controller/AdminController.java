package com.testkpi.quizbuilder.controller;

import com.testkpi.quizbuilder.entity.Feedback;
import com.testkpi.quizbuilder.payload.FeedbackDto;
import com.testkpi.quizbuilder.service.impl.FeedbackServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final FeedbackServiceImpl feedbackService;

    @Autowired
    public AdminController(FeedbackServiceImpl feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/feedback")
    public ResponseEntity<List<Feedback>> getAllQuestions() {
        return ResponseEntity.ok(feedbackService.findAllQuestionsAdmin());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping("/feedback/{questionId}")
    public ResponseEntity<Feedback> answerQuestion(@PathVariable Long questionId,
                                                         @RequestBody FeedbackDto feedbackDto) {
        return ResponseEntity.ok(feedbackService.answer(questionId, feedbackDto));
    }
}
