package com.testkpi.quizbuilder.service;

import com.testkpi.quizbuilder.entity.User;
import com.testkpi.quizbuilder.entity.test.Mark;
import com.testkpi.quizbuilder.payload.MarkDto;
import com.testkpi.quizbuilder.repository.MarkRepository;
import com.testkpi.quizbuilder.service.impl.MarkServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
class MarkServiceTest {

    @Mock
    private MarkRepository markRepository;

    @InjectMocks
    private MarkServiceImpl markService;

    @Test
    void save_ShouldSaveMark() {

        MarkDto markDto = new MarkDto();
        markDto.setUser(new User());
        markDto.setTest(new com.testkpi.quizbuilder.entity.test.Test());
        markDto.setMark(80);

        Mark expectedMark = Mark.builder()
                .user(markDto.getUser())
                .test(markDto.getTest())
                .mark(markDto.getMark()).build();

        when(markRepository.save(any(Mark.class))).thenReturn(expectedMark); // змінено тут

        Mark savedMark = markService.save(markDto);

        assertNotNull(savedMark);
        assertEquals(expectedMark.getUser(), savedMark.getUser());
        assertEquals(expectedMark.getTest(), savedMark.getTest());
        assertEquals(expectedMark.getMark(), savedMark.getMark());
        verify(markRepository).save(any(Mark.class)); // змінено тут
    }

    @Test
    void findAllByUser_ShouldReturnMarksByUser() {

        User user = new User();
        List<Mark> expectedMarks = new ArrayList<>();
        expectedMarks.add(new Mark());
        expectedMarks.add(new Mark());

        when(markRepository.findAllByUser(user)).thenReturn(expectedMarks);

        List<Mark> foundMarks = markService.findAllByUser(user);

        assertEquals(expectedMarks, foundMarks);
        verify(markRepository).findAllByUser(user);
    }

    @Test
    void findAllByTest_ShouldReturnListOfMarks() {

        com.testkpi.quizbuilder.entity.test.Test test = new com.testkpi.quizbuilder.entity.test.Test();
        test.setId(1L);

        List<Mark> expectedMarks = new ArrayList<>();
        expectedMarks.add(new Mark());
        expectedMarks.add(new Mark());

        when(markRepository.findAllByTest(test)).thenReturn(expectedMarks);

        List<Mark> foundMarks = markService.findAllByTest(test);

        assertNotNull(foundMarks);
        assertEquals(expectedMarks.size(), foundMarks.size());
        assertEquals(expectedMarks, foundMarks);
        verify(markRepository).findAllByTest(test);
    }

}
