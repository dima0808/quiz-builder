package com.testkpi.quizbuilder.repository;

import com.testkpi.quizbuilder.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testFindByUsernameOrEmail() {

        User user = User.builder()
                .username("testUser")
                .email("test@example.com")
                .password("password123")
                .build();
        userRepository.save(user);

        Optional<User> foundByUsernameOrEmail = userRepository.findByUsernameOrEmail("testUser", "test@example.com");

        assertThat(foundByUsernameOrEmail).isPresent();
        assertThat(foundByUsernameOrEmail.get().getUsername()).isEqualTo("testUser");
        assertThat(foundByUsernameOrEmail.get().getEmail()).isEqualTo("test@example.com");
    }

    @Test
    public void testExistsByUsername() {

        User user = User.builder()
                .username("testUser")
                .email("test@example.com")
                .password("password123")
                .build();
        userRepository.save(user);

        boolean existsByUsername = userRepository.existsByUsername("testUser");
        boolean nonExists = userRepository.existsByUsername("nonExistingUsername");

        assertThat(existsByUsername).isTrue();
        assertThat(nonExists).isFalse();
    }

    @Test
    public void testExistsByEmail() {

        User user = User.builder()
                .username("testUser")
                .email("test@example.com")
                .password("password123")
                .build();
        userRepository.save(user);

        boolean existsByEmail = userRepository.existsByEmail("test@example.com");
        boolean nonExists = userRepository.existsByEmail("nonexisting@example.com");

        assertThat(existsByEmail).isTrue();
        assertThat(nonExists).isFalse();
    }
}