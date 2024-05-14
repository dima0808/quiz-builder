package com.testkpi.quizbuilder.repository;

import com.testkpi.quizbuilder.entity.test.Test;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestRepository extends JpaRepository<Test, Long> {

    List<Test> findByAuthor(String author);

    List<Test> findByTopic(String topic);

    Boolean existsByAuthor(String author);
}
