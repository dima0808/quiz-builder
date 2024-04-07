package com.testkpi.quizbuilder.service.impl;

import com.testkpi.quizbuilder.entity.test.Test;
import com.testkpi.quizbuilder.payload.TestDto;
import com.testkpi.quizbuilder.repository.TestRepository;
import com.testkpi.quizbuilder.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestServiceImpl implements TestService {

    private final TestRepository testRepository;

    @Autowired
    public TestServiceImpl(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    @Override
    public Test saveTest(TestDto testDto) {
        Test test = new Test();
        test.setAuthor(testDto.getAuthor());
        test.setName(testDto.getName());
        test.setDescription(testDto.getDescription());
        test.setTopic(testDto.getTopic());
        test.setQuestions(testDto.getQuestions());

        testRepository.save(test);
        return test;
    }
}
