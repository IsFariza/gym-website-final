# Pink Power Gym
## Project Overview
Pink Power Gym is a specialized backend service for a female-only fitness community. It provides a secure environment for user registration, authentication via JWT, and administrative user management. This project also featured with the integration of SendGrid SMTP to provide automated email notifications upon successful registration.
## Tech Stack
- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB (Mongoose ODM)
- Mailing: Nodemailer & SendGrid SMTP
- Security: JWT, Bcrypt
## Key features:
- Password hashing with bcrypt and session management via jsonwebtoken
- Role-Based Access Controll, missleware to distinguish between user, trainer, admin roles
- SMTP integration, authomated "Welcome" emails sent via SendGrid
- Validation: strict gender-based registartion logic (femail only) and Mongoose schema validation

## API documentation:
### Public Routes: 
- POST /api/auth/register 
- POST /api/auth/login
- GET /api/trainers /api/trainers/:id
- GET /api/exercises
- GET /api/workouts
### Admin routes:
- PUT /api/admin/users/:id
- GET /api/admin/users
- PUT /api/trainers/:id
- DELETE /api/admin/users/:id /api/admin/trainers/:id
### Trainer routes
- POST /api/exercises
### User routes
- GET & PUT /api/users/profile
- POST /api/workouts
- DELETE /api/workouts/:id
- PUT /api/workouts/:id/exercises
- DELETE /api/workouts/:id/exercises/:exerciseId

## Feature screenshots
### User Registration 
Demonstrates successful user registration. The API validates that the user is female, hashes the password using bcrypt, and saves the record to MongoDB 
![resgister](./screenshots/register.jpg) 
### Automated welcome email
User receives a formatted HTML email immediately after registration. This is sent via SendGrid’s SMTP relay using a secure STARTTLS connection on Port 587

![mail](./screenshots/mail.jpg)

### Role-Based Access Control
Standard users are blocked from accessing admin/trainer endpoints, ensuring data privacy. Screenshot below demostrates server response when trying to access admin endpoint with user's access token
![not-admin](./screenshots/not%20admin.jpg)

### Admininstrative management
Administrative functionality allowing the update of user profiles. This uses a PATCH request for partial data modification, following RESTful best practices
![promote](./screenshots/promote-trainer.jpg)
