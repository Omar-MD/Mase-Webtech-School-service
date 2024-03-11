package com.tus.schoolservice.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.tus.schoolservice.dao.UserInfoRepo;
import com.tus.schoolservice.dto.User;
import com.tus.schoolservice.dto.UserRole;

class UserInfoServiceTest {

    private UserInfoService userInfoService;
    private UserInfoRepo userInfoRepoMock;

    @BeforeEach
    void setUp() {
        userInfoRepoMock = mock(UserInfoRepo.class);
        userInfoService = new UserInfoService(userInfoRepoMock);
    }

    @Test
    void testLoadUserByUsernameSuccess() {
        User user = new User("test@example.com", "testuser", "password", UserRole.PARENT.toString());
        when(userInfoRepoMock.findByName("testuser")).thenReturn(Optional.of(user));
        assertEquals(user.getName(), userInfoService.loadUserByUsername("testuser").getUsername());
    }

    @Test
    void testLoadUserByUsernameNotFound() {
        when(userInfoRepoMock.findByName("nonexistentuser")).thenReturn(Optional.empty());
        assertThrows(UsernameNotFoundException.class, () -> userInfoService.loadUserByUsername("nonexistentuser"));
    }
}
