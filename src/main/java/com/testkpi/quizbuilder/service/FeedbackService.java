package com.testkpi.quizbuilder.service;

import com.testkpi.quizbuilder.entity.Feedback;
import com.testkpi.quizbuilder.payload.FeedbackDto;

import java.util.List;

public interface FeedbackService {

    Feedback saveQuestion(FeedbackDto feedbackDto);

    Feedback answer(Long id, FeedbackDto feedbackDto);

    List<Feedback> findAllQuestionsAdmin();

    Feedback findById(Long id);

    List<Feedback> findAllQuestionsByUsername(String username);

    void deleteById(Long id);
}
