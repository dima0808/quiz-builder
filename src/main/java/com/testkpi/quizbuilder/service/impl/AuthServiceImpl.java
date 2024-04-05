package com.testkpi.quizbuilder.service.impl;

import com.testkpi.quizbuilder.entity.Role;
import com.testkpi.quizbuilder.entity.User;
import com.testkpi.quizbuilder.payload.RegisterDto;
import com.testkpi.quizbuilder.repository.RoleRepository;
import com.testkpi.quizbuilder.repository.UserRepository;
import com.testkpi.quizbuilder.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String register(RegisterDto registerDto) {

        if (userRepository.existsByUsername(registerDto.getUsername())) {
            return "User already exists.";
        }

        if (userRepository.existsByEmail(registerDto.getEmail())) {
            return "Email already exists.";
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
        return "User " + user.getUsername() + " has successfully registered.";
    }
}
