import { NextResponse } from "next/server";

// Standardized response utilities for consistent API responses

export function successResponse(data, message = "Success", status = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function errorResponse(message = "Error", status = 500, errors = null) {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return NextResponse.json(response, { status });
}

export function validationErrorResponse(errors, message = "Validation failed") {
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
    },
    { status: 400 }
  );
}

export function notFoundResponse(message = "Resource not found") {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: 404 }
  );
}

export function unauthorizedResponse(message = "Unauthorized") {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: 401 }
  );
}

export function forbiddenResponse(message = "Forbidden") {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: 403 }
  );
}

export function conflictResponse(message = "Conflict") {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: 409 }
  );
}

export function createdResponse(data, message = "Created successfully") {
  return successResponse(data, message, 201);
}

export function paginatedResponse(data, pagination, message = "Success") {
  return NextResponse.json({
    success: true,
    message,
    data,
    pagination,
  });
}





