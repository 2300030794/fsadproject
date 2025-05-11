package com.klu;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/api/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody User user) {
        try {
            logger.debug("Signup request for username: {}", user.getUsername());
            // Validate input fields
            if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
                logger.warn("Missing or empty username in signup request");
                return ResponseEntity.badRequest().body("Username is required");
            }
            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                logger.warn("Missing or empty email in signup request");
                return ResponseEntity.badRequest().body("Email is required");
            }
            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                logger.warn("Missing or empty password in signup request");
                return ResponseEntity.badRequest().body("Password is required");
            }
            if (user.getFirstName() == null || user.getFirstName().trim().isEmpty()) {
                logger.warn("Missing or empty first name in signup request");
                return ResponseEntity.badRequest().body("First name is required");
            }
            if (user.getLastName() == null || user.getLastName().trim().isEmpty()) {
                logger.warn("Missing or empty last name in signup request");
                return ResponseEntity.badRequest().body("Last name is required");
            }

            // Check for duplicates
            if (userRepository.findByUsername(user.getUsername()) != null) {
                logger.warn("Username already exists: {}", user.getUsername());
                return ResponseEntity.badRequest().body("Username already exists");
            }
            

            // Encode password and save user
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            logger.info("User registered successfully: {}", user.getUsername());
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            logger.error("Error during signup for username: {}, email: {}", user.getUsername(), user.getEmail(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during signup: " + e.getMessage());
        }
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        try {
            logger.debug("Login request for username: {}", loginUser.getUsername());
            if (loginUser.getUsername() == null || loginUser.getUsername().trim().isEmpty()) {
                logger.warn("Missing or empty username in login request");
                return ResponseEntity.badRequest().body("Username is required");
            }
            if (loginUser.getPassword() == null || loginUser.getPassword().trim().isEmpty()) {
                logger.warn("Missing or empty password in login request");
                return ResponseEntity.badRequest().body("Password is required");
            }
            User user = userRepository.findByUsername(loginUser.getUsername());
            if (user == null) {
                logger.warn("User not found: {}", loginUser.getUsername());
                return ResponseEntity.badRequest().body("Invalid username or password");
            }
            if (!passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
                logger.warn("Invalid password for username: {}", loginUser.getUsername());
                return ResponseEntity.badRequest().body("Invalid username or password");
            }
            String token = jwtUtil.generateToken(user.getUsername());
            logger.info("Login successful for username: {}", user.getUsername());
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (Exception e) {
            logger.error("Error during login for username: {}", loginUser.getUsername(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during login: " + e.getMessage());
        }
    }
}

// DTO for login response
class AuthResponse {
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}