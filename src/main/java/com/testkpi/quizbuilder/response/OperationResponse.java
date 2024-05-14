package com.testkpi.quizbuilder.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OperationResponse {

    private int status;
    private String message;
    private long timestamp;
}
