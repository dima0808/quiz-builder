package com.testkpi.quizbuilder.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.testkpi.quizbuilder.entity.User;
import com.testkpi.quizbuilder.entity.test.Mark;
import com.testkpi.quizbuilder.payload.TestDto;
import com.testkpi.quizbuilder.service.AuthService;
import com.testkpi.quizbuilder.service.MarkService;
import com.testkpi.quizbuilder.service.TestService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@WebMvcTest(TestController.class)
class TestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TestService testService;

    @MockBean
    private AuthService authService;

    @MockBean
    private MarkService markService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {

        List<com.testkpi.quizbuilder.entity.test.Test> tests = Arrays.asList(new com.testkpi.quizbuilder.entity.test.Test(),
                new com.testkpi.quizbuilder.entity.test.Test());
        when(testService.findAllTests()).thenReturn(tests);

        com.testkpi.quizbuilder.entity.test.Test test = new com.testkpi.quizbuilder.entity.test.Test();
        test.setId(1L);
        when(testService.findTestById(1L)).thenReturn(test);

        test.setAuthor("testAuthor");
        when(testService.findTestById(1L)).thenReturn(test);

        User user = new User();
        user.setUsername("testAuthor");
        when(authService.findUserByUsername("testAuthor")).thenReturn(user);
    }

    @Test
    @WithMockUser
    void getAllTests_ShouldReturnAllTests() throws Exception {
        mockMvc.perform(get("/api/test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    @WithMockUser
    void getTest_ShouldReturnTest() throws Exception {
        mockMvc.perform(get("/api/test/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    @WithMockUser
    void createTest_ShouldCreateTest() throws Exception {
        TestDto testDto = new TestDto();
        testDto.setName("Test Name");

        mockMvc.perform(post("/api/test/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testDto))
                        .with(SecurityMockMvcRequestPostProcessors.csrf())) // Add CSRF token
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message").value("Test 'Test Name' has successfully created."));
    }

    @Test
    @WithMockUser
    void deleteTest_ShouldDeleteTest() throws Exception {
        mockMvc.perform(delete("/api/test/1")
                        .with(SecurityMockMvcRequestPostProcessors.csrf())) // Add CSRF token
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Test with id 1 deleted successfully."));

        verify(testService, times(1)).deleteById(1L);
    }

    @Test
    @WithMockUser
    void getAllLikedTests_ShouldReturnLikedTests() throws Exception {

        User user = new User();
        List<com.testkpi.quizbuilder.entity.test.Test> likedTests = new ArrayList<>();
        com.testkpi.quizbuilder.entity.test.Test test1 = new com.testkpi.quizbuilder.entity.test.Test();
        test1.setId(1L);
        test1.setName("Test 1");
        likedTests.add(test1);
        com.testkpi.quizbuilder.entity.test.Test test2 = new com.testkpi.quizbuilder.entity.test.Test();
        test2.setId(2L);
        test2.setName("Test 2");
        likedTests.add(test2);
        user.setLikedTests(likedTests);

        when(authService.findUserByUsername(anyString())).thenReturn(user);

        mockMvc.perform(get("/api/test/liked"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].name").value("Test 1"))
                .andExpect(jsonPath("$[1].id").value(2L))
                .andExpect(jsonPath("$[1].name").value("Test 2"));
    }

    @Test
    @WithMockUser
    void getAllPassedTests_ShouldReturnUserPassedTests() throws Exception {

        User user = new User();
        List<Mark> marks = new ArrayList<>();
        com.testkpi.quizbuilder.entity.test.Test test1 = new com.testkpi.quizbuilder.entity.test.Test();
        test1.setId(1L);
        marks.add(Mark.builder().user(user).test(test1).mark(80).build());
        com.testkpi.quizbuilder.entity.test.Test test2 = new com.testkpi.quizbuilder.entity.test.Test();
        test2.setId(2L);
        marks.add(Mark.builder().user(user).test(test2).mark(90).build());

        when(authService.findUserByUsername(anyString())).thenReturn(user);

        when(markService.findAllByUser(user)).thenReturn(marks);

        mockMvc.perform(get("/api/test/passed"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$['1']").value(80))
                .andExpect(jsonPath("$['2']").value(90));
    }

    @Test
    @WithMockUser(username = "testAuthor")
    void deleteUserAttempt_ShouldDeleteUserAttempt() throws Exception {

        com.testkpi.quizbuilder.entity.test.Test test = new com.testkpi.quizbuilder.entity.test.Test();
        test.setId(1L);
        test.setAuthor("testAuthor");
        User user = new User();
        user.setUsername("userToDelete");

        when(authService.findUserByUsername("userToDelete")).thenReturn(user);

        when(testService.findTestById(1L)).thenReturn(test);

        mockMvc.perform(delete("/api/test/1/statistics/userToDelete")
                        .with(SecurityMockMvcRequestPostProcessors.csrf())) // Додати токен CSRF
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("userToDelete's attempt deleted successfully."));
    }
}


