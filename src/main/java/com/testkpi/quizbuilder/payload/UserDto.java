package com.testkpi.quizbuilder.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDto {

    private String firstName;
    private String secondName;
    private String phoneNumber;
    private String email;
    private String password;
}
