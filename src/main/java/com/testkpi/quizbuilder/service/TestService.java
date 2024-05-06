package com.testkpi.quizbuilder.service;

import com.testkpi.quizbuilder.entity.test.Test;
import com.testkpi.quizbuilder.payload.TestDto;

import java.util.List;

public interface TestService {

    Test saveTest(TestDto testDto);

    List<Test> findAllTests();

    void deleteAllTests();
}
