package com.testkpi.quizbuilder.service;

import com.testkpi.quizbuilder.entity.test.Test;
import com.testkpi.quizbuilder.payload.TestDto;

public interface TestService {

    Test saveTest(TestDto testDto);
}
