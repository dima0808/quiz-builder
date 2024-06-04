package com.testkpi.quizbuilder.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.testkpi.quizbuilder.entity.Feedback;
import com.testkpi.quizbuilder.payload.FeedbackDto;
import com.testkpi.quizbuilder.service.FeedbackService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FeedbackController.class)
class FeedbackControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private FeedbackService feedbackService;

    @Test
    @WithMockUser
    void getAllQuestions_ShouldReturnAllQuestions() throws Exception {
        List<Feedback> feedbackList = new ArrayList<>();
        when(feedbackService.findAllQuestionsByUsername(anyString())).thenReturn(feedbackList);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/feedback")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @WithMockUser
    void getQuestion_ShouldReturnQuestion() throws Exception {
        Feedback feedback = new Feedback();
        feedback.setId(1L);
        when(feedbackService.findById(1L)).thenReturn(feedback);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/feedback/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1)); // Перевірка, що повертається об'єкт з вірним id
    }

    @Test
    @WithMockUser
    void addQuestion_ShouldCreateQuestion() throws Exception {
        FeedbackDto feedbackDto = new FeedbackDto();
        feedbackDto.setTheme("question theme");
        feedbackDto.setMessage("question message");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/feedback/add")
                        .with(SecurityMockMvcRequestPostProcessors.csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(feedbackDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message").value("Question has been sent to the administration."));
    }

    @Test
    @WithMockUser
    void deleteQuestion_ShouldDeleteQuestion() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/feedback/1")
                        .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Question has been deleted."));

        verify(feedbackService, times(1)).deleteById(1L);
    }
}
