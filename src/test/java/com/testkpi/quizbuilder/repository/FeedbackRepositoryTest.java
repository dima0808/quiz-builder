package com.testkpi.quizbuilder.repository;

import com.testkpi.quizbuilder.entity.Feedback;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class FeedbackRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Test
    @Rollback(false)
    public void testFindAllByUsername() {

        Feedback feedback = new Feedback();
        feedback.setUsername("testUser");
        entityManager.persist(feedback);
        entityManager.flush();

        List<Feedback> feedbackList = feedbackRepository.findAllByUsername("testUser");

        assertThat(feedbackList).isNotEmpty();
        assertThat(feedbackList.get(0).getUsername()).isEqualTo("testUser");
    }
}
