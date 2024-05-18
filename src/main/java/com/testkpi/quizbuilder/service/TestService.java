package com.testkpi.quizbuilder.service;

import com.testkpi.quizbuilder.entity.test.Test;
import com.testkpi.quizbuilder.payload.TestDto;

import java.util.List;

public interface TestService {

    Test saveTest(TestDto testDto);

    List<Test> findAllTests();

    Test findTestById(Long testId);

    void deleteAllTests();

    void deleteById(Long testId);

    Test updateTest(Long testId, TestDto testDto);
}
