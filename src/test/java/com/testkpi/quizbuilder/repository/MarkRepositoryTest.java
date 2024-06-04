package com.testkpi.quizbuilder.repository;

import com.testkpi.quizbuilder.entity.User;
import com.testkpi.quizbuilder.entity.test.Mark;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class MarkRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private MarkRepository markRepository;

    @Test
    @Rollback(false)
    public void testDeleteByTestAndUser() {

        User user = new User();
        user.setUsername("testUser");
        user.setEmail("testUser@example.com");
        user.setPassword("password123");
        entityManager.persist(user);

        com.testkpi.quizbuilder.entity.test.Test test = new com.testkpi.quizbuilder.entity.test.Test();
        test.setAuthor("testAuthor");
        test.setName("test1");
        test.setTopic("Survey");
        entityManager.persist(test);

        Mark mark = new Mark();
        mark.setUser(user);
        mark.setTest(test);
        mark.setMark(10);
        entityManager.persist(mark);

        entityManager.flush();

        markRepository.deleteByTestAndUser(test, user);

        List<Mark> marks = markRepository.findAllByUser(user);
        assertThat(marks).isEmpty();
    }
}

