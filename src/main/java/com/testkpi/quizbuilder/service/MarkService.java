package com.testkpi.quizbuilder.service;

import com.testkpi.quizbuilder.entity.User;
import com.testkpi.quizbuilder.entity.test.Mark;
import com.testkpi.quizbuilder.entity.test.Test;
import com.testkpi.quizbuilder.payload.MarkDto;

import java.util.List;

public interface MarkService {

    Mark save(MarkDto markDto);

    List<Mark> findAllByUser(User user);

    List<Mark> findAllByTest(Test test);

    void deleteByTestAndUser(Test test, User user);
}
