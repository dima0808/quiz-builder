package com.testkpi.quizbuilder.repository;

import com.testkpi.quizbuilder.entity.test.Answer;
import com.testkpi.quizbuilder.entity.test.Question;
import com.testkpi.quizbuilder.entity.test.Test;
import org.assertj.core.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Arrays;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class TestRepositoryTest {

    @Autowired
    private TestRepository testRepository;

    @org.junit.jupiter.api.Test
    public void TestRepository_SaveTest_ReturnSavedTest() {

        Test test = Test.builder()
                .author("dimitri")
                .name("Біологія 6-й клас. Еукаріоти та прокаріоти")
                .description("Вивчити параграф 11-12. 4 питання, 10 балів.")
                .topic("Навчання")
                .questions(Arrays.asList(
                        Question.builder()
                                .text("1st question?")
                                .type(1)
                                .answers(Arrays.asList(
                                        Answer.builder().text("1 answer AAA").isCorrect(false).build(),
                                        Answer.builder().text("2 answer AAA").isCorrect(true).build(),
                                        Answer.builder().text("3 answer AAA").isCorrect(false).build()))
                                .build(),

                        Question.builder()
                                .text("2nd question?")
                                .type(3)
                                .answers(Arrays.asList(
                                        Answer.builder().text("1 answer BBB").isCorrect(false).build(),
                                        Answer.builder().text("2 answer BBB").isCorrect(true).build(),
                                        Answer.builder().text("3 answer BBB").isCorrect(false).build()))
                                .build(),

                        Question.builder()
                                .text("3rd question?")
                                .type(2)
                                .answers(Arrays.asList(
                                        Answer.builder().text("1 answer CCC").isCorrect(false).build(),
                                        Answer.builder().text("2 answer CCC").isCorrect(true).build(),
                                        Answer.builder().text("3 answer CCC").isCorrect(false).build()))
                                .build(),

                        Question.builder()
                                .text("4th question?")
                                .type(1)
                                .answers(Arrays.asList(
                                        Answer.builder().text("1 answer DDD").isCorrect(false).build(),
                                        Answer.builder().text("2 answer DDD").isCorrect(true).build(),
                                        Answer.builder().text("3 answer DDD").isCorrect(false).build()))
                                .build()
                )).build();


        Test savedTest = testRepository.save(test);

        Assertions.assertThat(savedTest).isNotNull();
        Assertions.assertThat(savedTest.getId()).isGreaterThan(0);
    }
}
