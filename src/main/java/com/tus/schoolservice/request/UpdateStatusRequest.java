package com.tus.schoolservice.request;

import com.tus.schoolservice.dto.student.RegistrationStatus;

public class UpdateStatusRequest {
	private Long id;
	private RegistrationStatus newStatus;

	public UpdateStatusRequest(Long id, RegistrationStatus newStatus) {
		this.id = id;
		this.newStatus = newStatus;
	}
	public Long getId() {
		return id;
	}
	public RegistrationStatus getNewStatus() {
		return newStatus;
	}
}
