package com.testkpi.quizbuilder.service.impl;

import com.testkpi.quizbuilder.entity.User;
import com.testkpi.quizbuilder.entity.test.Mark;
import com.testkpi.quizbuilder.entity.test.Test;
import com.testkpi.quizbuilder.payload.MarkDto;
import com.testkpi.quizbuilder.repository.MarkRepository;
import com.testkpi.quizbuilder.service.MarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarkServiceImpl implements MarkService {

    private final MarkRepository markRepository;

    @Autowired
    public MarkServiceImpl(MarkRepository markRepository) {
        this.markRepository = markRepository;
    }

    @Override
    public Mark save(MarkDto markDto) {

        Mark mark = Mark.builder()
                .user(markDto.getUser())
                .test(markDto.getTest())
                .mark(markDto.getMark()).build();

        return markRepository.save(mark);
    }

    @Override
    public List<Mark> findAllByUser(User user) {
        return markRepository.findAllByUser(user);
    }

    @Override
    public List<Mark> findAllByTest(Test test) {
        return markRepository.findAllByTest(test);
    }

    @Override
    public void deleteByTestAndUser(Test test, User user) {
        System.out.println("МИ ТУТ 1");
        markRepository.deleteByTestAndUser(test, user);
        System.out.println("МИ ТУТ 2");
    }
}
