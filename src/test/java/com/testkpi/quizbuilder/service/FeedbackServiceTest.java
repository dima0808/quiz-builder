package com.testkpi.quizbuilder.service;

import com.testkpi.quizbuilder.entity.Feedback;
import com.testkpi.quizbuilder.payload.FeedbackDto;
import com.testkpi.quizbuilder.repository.FeedbackRepository;
import com.testkpi.quizbuilder.service.impl.FeedbackServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FeedbackServiceTest {

    @Mock
    private FeedbackRepository feedbackRepository;

    @InjectMocks
    private FeedbackServiceImpl feedbackService;

    public FeedbackServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveQuestion_ShouldSaveQuestion() {

        FeedbackDto feedbackDto = new FeedbackDto();
        feedbackDto.setUsername("testUser");
        feedbackDto.setType("Question");
        feedbackDto.setTheme("Test theme");
        feedbackDto.setMessage("Test message");

        Feedback feedback = new Feedback();
        feedback.setUsername(feedbackDto.getUsername());
        feedback.setType(feedbackDto.getType());
        feedback.setTheme(feedbackDto.getTheme());
        feedback.setMessage(feedbackDto.getMessage());
        feedback.setQuestionDate(LocalDate.now());

        when(feedbackRepository.save(any(Feedback.class))).thenReturn(feedback);

        Feedback savedFeedback = feedbackService.saveQuestion(feedbackDto);

        assertNotNull(savedFeedback);
        assertEquals(feedbackDto.getUsername(), savedFeedback.getUsername());
        assertEquals(feedbackDto.getType(), savedFeedback.getType());
        assertEquals(feedbackDto.getTheme(), savedFeedback.getTheme());
        assertEquals(feedbackDto.getMessage(), savedFeedback.getMessage());
        assertNotNull(savedFeedback.getQuestionDate());
    }

    @Test
    void answer_ShouldAnswerQuestion() {

        Long id = 1L;
        FeedbackDto feedbackDto = new FeedbackDto();
        feedbackDto.setAnswer("Test answer");

        Feedback question = new Feedback();
        question.setId(id);
        question.setAnswer(null);

        when(feedbackRepository.findById(id)).thenReturn(Optional.of(question));
        when(feedbackRepository.save(question)).thenReturn(question);

        Feedback answeredQuestion = feedbackService.answer(id, feedbackDto);

        assertNotNull(answeredQuestion);
        assertEquals(feedbackDto.getAnswer(), answeredQuestion.getAnswer());
        assertNotNull(answeredQuestion.getAnswerDate());
        assertEquals(LocalDate.now(), answeredQuestion.getAnswerDate());
    }

    @Test
    void findAllQuestionsAdmin_ShouldReturnAllQuestions() {

        List<Feedback> feedbackList = new ArrayList<>();
        feedbackList.add(new Feedback());
        feedbackList.add(new Feedback());

        when(feedbackRepository.findAll()).thenReturn(feedbackList);

        List<Feedback> foundFeedbackList = feedbackService.findAllQuestionsAdmin();

        assertEquals(feedbackList.size(), foundFeedbackList.size());
    }

    @Test
    void findById_WithExistingId_ShouldReturnQuestion() {

        Long id = 1L;
        Feedback feedback = new Feedback();

        when(feedbackRepository.findById(id)).thenReturn(Optional.of(feedback));

        Feedback foundFeedback = feedbackService.findById(id);

        assertNotNull(foundFeedback);
    }

    @Test
    void findById_WithNonExistingId_ShouldReturnNull() {

        Long id = 1L;

        when(feedbackRepository.findById(id)).thenReturn(Optional.empty());

        Feedback foundFeedback = feedbackService.findById(id);

        assertNull(foundFeedback);
    }

    @Test
    void findAllQuestionsByUsername_ShouldReturnQuestions() {

        String username = "testUser";
        List<Feedback> feedbackList = new ArrayList<>();
        feedbackList.add(new Feedback());
        feedbackList.add(new Feedback());

        when(feedbackRepository.findAllByUsername(username)).thenReturn(feedbackList);

        List<Feedback> foundFeedbackList = feedbackService.findAllQuestionsByUsername(username);

        assertEquals(feedbackList.size(), foundFeedbackList.size());
    }
}
