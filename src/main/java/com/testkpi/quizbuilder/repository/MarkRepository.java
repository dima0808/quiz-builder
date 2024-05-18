package com.testkpi.quizbuilder.repository;

import com.testkpi.quizbuilder.entity.User;
import com.testkpi.quizbuilder.entity.test.Mark;
import com.testkpi.quizbuilder.entity.test.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface MarkRepository extends JpaRepository<Mark, Long> {

    List<Mark> findAllByUser(User user);

    List<Mark> findAllByTest(Test test);

    @Modifying
    @Transactional
    @Query("DELETE FROM Mark m WHERE m.user = :user AND m.test = :test")
    void deleteByTestAndUser(@Param("test") Test test, @Param("user") User user);

}
