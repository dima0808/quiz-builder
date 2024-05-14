package com.testkpi.quizbuilder.payload;

import com.testkpi.quizbuilder.entity.test.Question;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TestDto {

    private String author;
    private String name;
    private String description;
    private String topic;
    private Short status;
    private List<Question> questions;
}
