package com.tus.schoolservice.controller;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import com.intuit.karate.junit5.Karate;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AuthControllerTestIT {

	@LocalServerPort
    int randomServerPort;

	@Karate.Test
    Karate runAll() {
		System.setProperty("local.server.port", String.valueOf(randomServerPort));

		//return Karate.run("01_getAll.feature").relativeTo(getClass());
        return Karate.run().relativeTo(getClass());
	}

}


