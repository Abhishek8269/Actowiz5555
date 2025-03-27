# Actowiz5555

Subscribe API

Description OF the TAsk (SERVER)/// Backend////// This is a Node.js backend server that handles authentication, logging, subscriptions, and token management.

Features

.User authentication (Auth Controller)

.Logging system (Log Controller)

.Subscription management (Subscription Controller)

.Token generation and validation (Token Controller)

.Middleware for authentication

.Database connection setup

Installation

Clone the repository:

git clone

Navigate to the server directory:

cd server

Install dependencies:

npm install

Environment Variables

Create a .env file in the root directory and configure the necessary environment variables

Running the Server

npm start

API Endpoints

.Authentication

POST /login: User login

POST /register: User registration

.Subscription

GET /subscription: Fetch subscription details

Token Management

POST /generate: Generate API tokens

/////////FRONTEND//////

Subscription Management Dashboard

This is a Subscription Management Dashboard built using React + Vite for frontend, and Node.js with MySQL for backend. It includes authentication, token generation, and usage tracking.

Features

.User Authentication (Login/Signup)

.API Subscription Management

.API Token Generation

.Usage Tracking

.Responsive UI with Tailwind CSS

.Secure API with JWT Authentication

Tech Stack

Frontend: React.js, Vite , CSS

Backend: Node.js, Express

Database: MySQL

Authentication: JWT

Package Manager: npm

Authentication

.JWT (JSON Web Token) is used for secure authentication.

.Tokens are generated upon login and must be included in the Authorization header for protected routes.
