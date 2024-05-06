package com.testkpi.quizbuilder.service.impl;

import com.testkpi.quizbuilder.entity.Feedback;
import com.testkpi.quizbuilder.payload.FeedbackDto;
import com.testkpi.quizbuilder.repository.FeedbackRepository;
import com.testkpi.quizbuilder.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    @Autowired
    public FeedbackServiceImpl(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public Feedback saveQuestion(FeedbackDto feedbackDto) {
        Feedback feedback = new Feedback();
        feedback.setUsername(feedbackDto.getUsername());
        feedback.setType(feedbackDto.getType());
        feedback.setTheme(feedbackDto.getTheme());
        feedback.setMessage(feedbackDto.getMessage());
        feedback.setQuestionDate(LocalDate.now());

        feedbackRepository.save(feedback);
        return feedback;
    }

    @Override
    public List<Feedback> findAllQuestions() {
        return feedbackRepository.findAll();
    }

    @Override
    public List<Feedback> findAllQuestionsByUsername(String username) {
        return feedbackRepository.findAllByUsername(username);
    }
}
