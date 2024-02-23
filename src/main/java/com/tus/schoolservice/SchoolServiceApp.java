package com.tus.schoolservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SchoolServiceApp {

	public static void main(String[] args) {
		SpringApplication.run(SchoolServiceApp.class, args);
		System.out.println("School Service Running...");
	}

}