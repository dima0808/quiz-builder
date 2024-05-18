package com.testkpi.quizbuilder.payload;

import com.testkpi.quizbuilder.entity.User;
import com.testkpi.quizbuilder.entity.test.Test;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarkDto {

    private User user;

    private Test test;

    private Integer mark;
}
