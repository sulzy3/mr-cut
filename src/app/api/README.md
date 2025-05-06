# API Routes Documentation

This document provides an overview of all available API endpoints in the application.

## Authentication Routes

### Login
- **Endpoint:** `/api/auth/login`
- **Method:** POST
- **Description:** Authenticates a user by phone number
- **Request Body:**
  ```json
  {
    "phone_number": "string"
  }
  ```
- **Response:** Returns user data and login status

### Create Manager
- **Endpoint:** `/api/auth/create-manager`
- **Method:** POST
- **Description:** Creates a new manager account
- **Request Body:**
  ```json
  {
    "phone_number": "string",
    "first_name": "string",
    "last_name": "string"
  }
  ```
- **Response:** Returns created manager data

### Create Barber
- **Endpoint:** `/api/auth/create-barber`
- **Method:** POST
- **Description:** Creates a new barber account with profile
- **Request Body:**
  ```json
  {
    "phone_number": "string",
    "first_name": "string",
    "last_name": "string",
    "specialties": ["string"],
    "working_hours": {},
    "photo_url": "string",
    "bio": "string"
  }
  ```
- **Response:** Returns created barber user and profile data

## Barber Routes

### Get All Barbers
- **Endpoint:** `/api/barbers`
- **Method:** GET
- **Description:** Retrieves all barbers
- **Response:** Returns array of barber objects

### Create Barber
- **Endpoint:** `/api/barbers`
- **Method:** POST
- **Description:** Creates a new barber
- **Request Body:** Barber data object
- **Response:** Returns created barber object

## Service Routes

### Get All Services
- **Endpoint:** `/api/services`
- **Method:** GET
- **Description:** Retrieves all available services
- **Response:** Returns array of service objects

### Create Service
- **Endpoint:** `/api/services`
- **Method:** POST
- **Description:** Creates a new service
- **Request Body:** Service data object
- **Response:** Returns created service object

## Appointment Routes

### Get All Appointments
- **Endpoint:** `/api/appointments`
- **Method:** GET
- **Description:** Retrieves all appointments
- **Response:** Returns array of appointment objects

### Create Appointment
- **Endpoint:** `/api/appointments`
- **Method:** POST
- **Description:** Creates a new appointment with availability check
- **Request Body:**
  ```json
  {
    "barber_id": "string",
    "date": "string",
    "time": "string"
  }
  ```
- **Response:** Returns created appointment object
- **Error:** Returns 400 if time slot is already booked 