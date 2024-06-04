package com.testkpi.quizbuilder.service;

import com.testkpi.quizbuilder.payload.TestDto;
import com.testkpi.quizbuilder.repository.TestRepository;
import com.testkpi.quizbuilder.service.impl.TestServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class TestServiceTest {

    @Mock
    private TestRepository testRepository;

    @InjectMocks
    private TestServiceImpl testService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void saveTest_ShouldReturnSavedTest() {

        TestDto testDto = new TestDto();
        testDto.setAuthor("testAuthor");
        testDto.setName("Test Name");
        testDto.setDescription("Test Description");
        testDto.setTopic("Test Topic");
        testDto.setQuestions(new ArrayList<>());

        com.testkpi.quizbuilder.entity.test.Test test = new com.testkpi.quizbuilder.entity.test.Test();
        test.setAuthor(testDto.getAuthor());
        test.setName(testDto.getName());
        test.setDescription(testDto.getDescription());
        test.setTopic(testDto.getTopic());
        test.setQuestions(testDto.getQuestions());

        when(testRepository.save(any(com.testkpi.quizbuilder.entity.test.Test.class))).thenReturn(test);

        com.testkpi.quizbuilder.entity.test.Test savedTest = testService.saveTest(testDto);

        assertThat(savedTest).isNotNull();
        assertThat(savedTest.getAuthor()).isEqualTo(testDto.getAuthor());
        assertThat(savedTest.getName()).isEqualTo(testDto.getName());
        assertThat(savedTest.getDescription()).isEqualTo(testDto.getDescription());
        assertThat(savedTest.getTopic()).isEqualTo(testDto.getTopic());
        assertThat(savedTest.getQuestions()).isEqualTo(testDto.getQuestions());
    }

    @Test
    void findAllTests_ShouldReturnAllTests() {

        List<com.testkpi.quizbuilder.entity.test.Test> testList = new ArrayList<>();
        testList.add(new com.testkpi.quizbuilder.entity.test.Test());
        testList.add(new com.testkpi.quizbuilder.entity.test.Test());

        when(testRepository.findAll()).thenReturn(testList);

        List<com.testkpi.quizbuilder.entity.test.Test> foundTests = testService.findAllTests();

        assertThat(foundTests).isNotEmpty();
        assertThat(foundTests.size()).isEqualTo(2);
    }

    @Test
    void findTestById_WithExistingTestId_ShouldReturnTest() {

        Long testId = 1L;
        com.testkpi.quizbuilder.entity.test.Test test = new com.testkpi.quizbuilder.entity.test.Test();

        when(testRepository.findById(testId)).thenReturn(Optional.of(test));

        com.testkpi.quizbuilder.entity.test.Test foundTest = testService.findTestById(testId);

        assertThat(foundTest).isNotNull();
    }

    @Test
    void findTestById_WithNonExistingTestId_ShouldReturnNull() {

        Long testId = 1L;

        when(testRepository.findById(testId)).thenReturn(Optional.empty());

        com.testkpi.quizbuilder.entity.test.Test foundTest = testService.findTestById(testId);

        assertThat(foundTest).isNull();
    }

    @Test
    void deleteAllTests_ShouldCallDeleteAll() {

        testService.deleteAllTests();

        verify(testRepository, times(1)).deleteAll();
    }
}
