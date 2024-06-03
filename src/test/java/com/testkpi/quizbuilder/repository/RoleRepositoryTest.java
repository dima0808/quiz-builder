package com.testkpi.quizbuilder.repository;

import com.testkpi.quizbuilder.entity.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class RoleRepositoryTest {

    @Autowired
    private RoleRepository roleRepository;

    @Test
    public void testFindByName() {

        Role role = new Role();
        role.setName("ROLE_TEST");
        roleRepository.save(role);

        Optional<Role> foundRole = roleRepository.findByName("ROLE_TEST");

        assertThat(foundRole).isPresent();
        assertThat(foundRole.get().getName()).isEqualTo(role.getName());
    }
}
