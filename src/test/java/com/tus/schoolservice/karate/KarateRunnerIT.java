package com.tus.schoolservice.karate;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class KarateRunnerIT {

	@LocalServerPort
	int randomServerPort;

	@Test
    void executeFeatures() {
		System.setProperty("local.server.port", String.valueOf(randomServerPort));
        Results results = Runner.path("classpath:com/tus/schoolservice/karate/features").parallel(1);
        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }
}
