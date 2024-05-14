package com.testkpi.quizbuilder.repository;

import com.testkpi.quizbuilder.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    List<Feedback> findAllByUsername(String username);
}
