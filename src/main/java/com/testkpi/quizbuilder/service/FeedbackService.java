package com.testkpi.quizbuilder.service;

import com.testkpi.quizbuilder.entity.Feedback;
import com.testkpi.quizbuilder.payload.FeedbackDto;

import java.util.List;

public interface FeedbackService {

    Feedback saveQuestion(FeedbackDto feedbackDto);

    List<Feedback> findAllQuestions();

    List<Feedback> findAllQuestionsByUsername(String username);
}
