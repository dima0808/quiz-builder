package com.testkpi.quizbuilder.payload;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FeedbackDto {

    private String username;
    private String type;
    private String theme;
    private String message;
    private String answer;
    private LocalDate questionDate;
    private LocalDate answerDate;
}
