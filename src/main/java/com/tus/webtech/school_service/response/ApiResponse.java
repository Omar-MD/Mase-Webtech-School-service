package com.tus.webtech.school_service.response;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private ResponseType status;
    private int statusCode;
    private T data;
    private String errorMsg;

    private ApiResponse(ResponseType status, int statusCode, T data, String errorMsg) {
        this.status = status;
        this.statusCode = statusCode;
        this.data = data;
        this.errorMsg = errorMsg;
    }

    public static <T> ApiResponse<T> ok(int statusCode, T data) {
        return new ApiResponse<>(ResponseType.OK, statusCode, data, null);
    }

    public static <T> ApiResponse<T> error(int statusCode, String errorMsg) {
        return new ApiResponse<>(ResponseType.ERROR, statusCode, null, errorMsg);
    }

	public ResponseType getStatus() {
		return status;
	}

	public void setStatus(ResponseType status) {
		this.status = status;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}
}

enum ResponseType {
    OK,
    ERROR
}