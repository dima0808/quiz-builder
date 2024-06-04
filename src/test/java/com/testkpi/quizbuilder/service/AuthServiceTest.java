package com.testkpi.quizbuilder.service;

import com.testkpi.quizbuilder.entity.Role;
import com.testkpi.quizbuilder.entity.User;
import com.testkpi.quizbuilder.exception.UserException;
import com.testkpi.quizbuilder.payload.RegisterDto;
import com.testkpi.quizbuilder.payload.UserDto;
import com.testkpi.quizbuilder.repository.RoleRepository;
import com.testkpi.quizbuilder.repository.UserRepository;
import com.testkpi.quizbuilder.service.impl.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthServiceImpl authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void register_WithExistingUsername_ShouldThrowUserException() {

        RegisterDto registerDto = new RegisterDto("existingUser", "email@example.com", "password");
        when(userRepository.existsByUsername(registerDto.getUsername())).thenReturn(true);

        assertThrows(UserException.class, () -> authService.register(registerDto));
    }

    @Test
    void register_WithExistingEmail_ShouldThrowUserException() {

        RegisterDto registerDto = new RegisterDto("username", "existingEmail@example.com", "password");
        when(userRepository.existsByUsername(registerDto.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(registerDto.getEmail())).thenReturn(true);

        assertThrows(UserException.class, () -> authService.register(registerDto));
    }

    @Test
    void register_WithNonExistingUsernameAndEmail_ShouldReturnRegisteredUser() {

        RegisterDto registerDto = new RegisterDto("username", "email@example.com", "password");
        when(userRepository.existsByUsername(registerDto.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(registerDto.getEmail())).thenReturn(false);

        Role role = new Role();
        role.setName("ROLE_USER");
        when(roleRepository.findByName("ROLE_USER")).thenReturn(Optional.of(role));

        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(registerDto.getPassword());
        when(passwordEncoder.encode(registerDto.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        User registeredUser = authService.register(registerDto);

        assertNotNull(registeredUser);
        assertEquals(registerDto.getUsername(), registeredUser.getUsername());
        assertEquals(registerDto.getEmail(), registeredUser.getEmail());
        assertEquals("encodedPassword", registeredUser.getPassword());
        assertTrue(registeredUser.getRoles().contains(role));
    }

    @Test
    void updateUser_WithValidUserDto_ShouldUpdateUser() {

        String existingUsername = "existingUser";
        String newFirstName = "New";
        String newSecondName = "Name";
        String newEmail = "newemail@example.com";
        String newPhoneNumber = "123456789";

        User existingUser = new User();
        existingUser.setUsername(existingUsername);
        existingUser.setFirstName("Old");
        existingUser.setSecondName("Name");
        existingUser.setEmail("oldemail@example.com");
        existingUser.setPhoneNumber("987654321");

        UserDto userDto = new UserDto();
        userDto.setFirstName(newFirstName);
        userDto.setSecondName(newSecondName);
        userDto.setEmail(newEmail);
        userDto.setPhoneNumber(newPhoneNumber);

        when(userRepository.save(existingUser)).thenReturn(existingUser);

        User updatedUser = authService.updateUser(existingUser, userDto);

        assertNotNull(updatedUser);
        assertEquals(existingUsername, updatedUser.getUsername());
        assertEquals(newFirstName, updatedUser.getFirstName());
        assertEquals(newSecondName, updatedUser.getSecondName());
        assertEquals(newEmail, updatedUser.getEmail());
        assertEquals(newPhoneNumber, updatedUser.getPhoneNumber());
    }
}