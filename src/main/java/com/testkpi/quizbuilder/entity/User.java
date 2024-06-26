package com.testkpi.quizbuilder.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.testkpi.quizbuilder.entity.test.Test;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String secondName;
    private String phoneNumber;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private Set<Role> roles;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "users_liked_tests",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_users_liked_tests_user_id", foreignKeyDefinition = "FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE")),
            inverseJoinColumns = @JoinColumn(name = "test_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_users_liked_tests_test_id", foreignKeyDefinition = "FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE"))
    )
    @JsonIgnore
    private List<Test> likedTests;

    public void addLikedTest(Test test) {
        likedTests.add(test);
    }

    public void removeLikedTest(Test test) {
        likedTests.remove(test);
    }
}
