package com.tus.schoolservice.karate;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import com.intuit.karate.junit5.Karate;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class KarateRunnerIT {

	@LocalServerPort
	int randomServerPort;

	@Karate.Test
	Karate executeFeatures() {
		System.setProperty("local.server.port", String.valueOf(randomServerPort));
        return Karate.run().path("classpath:com/tus/schoolservice/karate/features");
    }
}
