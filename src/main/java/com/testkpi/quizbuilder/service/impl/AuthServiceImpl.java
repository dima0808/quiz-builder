package com.testkpi.quizbuilder.service.impl;

import com.testkpi.quizbuilder.entity.Role;
import com.testkpi.quizbuilder.entity.User;
import com.testkpi.quizbuilder.exception.UserException;
import com.testkpi.quizbuilder.payload.RegisterDto;
import com.testkpi.quizbuilder.payload.UserDto;
import com.testkpi.quizbuilder.repository.RoleRepository;
import com.testkpi.quizbuilder.repository.UserRepository;
import com.testkpi.quizbuilder.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(RegisterDto registerDto) {

        if (userRepository.existsByUsername(registerDto.getUsername())) {
            throw new UserException("User already exists.");
        }

        if (userRepository.existsByEmail(registerDto.getEmail())) {
            throw new UserException("Email already exists.");
        }

        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        Optional<Role> userRoleOptional = roleRepository.findByName("ROLE_USER");
        Role userRole = userRoleOptional.orElse(null);
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);
        return user;
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User existingUser, UserDto userDto) {

        if (userDto.getFirstName() != null) existingUser.setFirstName(userDto.getFirstName());
        if (userDto.getSecondName() != null) existingUser.setSecondName(userDto.getSecondName());
        if (userDto.getEmail() != null) existingUser.setEmail(userDto.getEmail());
        if(userDto.getPhoneNumber() !=  null) existingUser.setPhoneNumber(userDto.getPhoneNumber());

        return userRepository.save(existingUser);
    }


}
