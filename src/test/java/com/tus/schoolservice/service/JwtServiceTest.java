package com.tus.schoolservice.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;

import io.jsonwebtoken.Claims;

class JwtServiceTest {

    private JwtService jwtService;

    @Mock
    private UserDetails userDetails;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        jwtService = new JwtService();
    }

    @Test
    void testGenerateToken() {
        String username = "testuser";
        String token = jwtService.generateToken(username);
        assertNotNull(token);
    }

    @Test
    void testExtractUsername() {
        String username = "testuser";
        String token = jwtService.generateToken(username);
        String extractedUsername = jwtService.extractUsername(token);
        assertEquals(username, extractedUsername);
    }

    @Test
    void testExtractExpiration() {
        String username = "testuser";
        String token = jwtService.generateToken(username);
        Date expiration = jwtService.extractExpiration(token);
        assertNotNull(expiration);
    }

    @Test
    void testExtractClaim() {
        String username = "testuser";
        String token = jwtService.generateToken(username);
        String extractedUsername = jwtService.extractClaim(token, Claims::getSubject);
        assertEquals(username, extractedUsername);
    }

    @Test
    void testExtractAllClaims() {
        String username = "testuser";
        String token = jwtService.generateToken(username);
        Claims claims = jwtService.extractAllClaims(token);
        assertNotNull(claims);
    }

    @Test
    void testIsTokenExpired() {
        String username = "testuser";
        String token = jwtService.generateToken(username);
        boolean isExpired = jwtService.isTokenExpired(token);
        assertFalse(isExpired);
    }

    @Test
    void testValidateToken() {
        String username = "testuser";
        String token = jwtService.generateToken(username);
        when(userDetails.getUsername()).thenReturn(username);
        boolean isValid = jwtService.validateToken(token, userDetails);
        assertTrue(isValid);
    }
}