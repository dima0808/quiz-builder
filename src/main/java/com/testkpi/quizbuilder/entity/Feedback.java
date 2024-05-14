package com.testkpi.quizbuilder.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String type;
    private String theme;
    private String message;
    private String answer;

    @DateTimeFormat(pattern = "dd.MM.yyyy")
    private LocalDate questionDate;
    @DateTimeFormat(pattern = "dd.MM.yyyy")
    private LocalDate answerDate;
}
