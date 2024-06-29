# E-Learning Platform: SmartTutor

Tech Stack - TypeScript | Javascript | React.js | Node.js | Express.js | MongoDb | Redis

The project is a comprehensive online learning platform that connects teachers and students. Teachers can upload courses, and students can access and watch them. Moreover, teachers and students get personalised dashboards to monitor and track performances. The project follows the principles of clean architecture to ensure maintainability and scalability.

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/shahkushal38/OdooHackathon.git
   ```

2. Navigate to the project directory:

   ```shell
   cd OdooHackathon
   ```
3. Navigate to client directory and server directory

   ```shell
   cd client
   cd server
   ```
  
4. Install the dependencies separately(install in both client and server)

   ```shell
   npm install 
   ```

5. Set up the required environment variables. Rename the `.env.example` file to `.env` and provide the necessary values for your environment.

## Usage

1. Start the development server:

   -server side
   ```shell
   npm run dev
   ```
   -client side
   ```shell
   npm start 
   ```


2. Access the online learning platform through the provided URL in your web browser.

3. Sign up as a teacher or student to access the platform's features.

4. Teachers can upload courses, while students can browse and watch the available courses.

## Features

- Teacher and student registration and login
- Teacher dashboard to manage courses and track progress
- Student dashboard to browse and watch available courses
- Course upload and management for teachers
- Course browsing and playback for students
- Panel for managing users, courses, and system settings
- Dashboard for personalised evaluation of a users performance

## Architecture and Technologies

The project follows a client-server architecture, utilizing the following technologies:

- Backend:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - TypeScript
  - Redis for caching

- Frontend:
  - React
  - Redux for state management
  - Tailwind CSS for styling

## Folder Structure

Here's an overview of the main folders and their purposes in the project:

```
.
├── /client           # Frontend codebase
├── /server           # Backend codebase
```

For more detailed information, refer to the project's folder structure documentation [here](/docs/folder-structure.md).

## API Documentation

For detailed documentation on the available API endpoints and their usage, refer to the [API Documentation](/docs/api-documentation.md).

## Configuration

To configure the project, you need to set up the following environment variables:

- `PORT`: The port on which the server will run.
- `MONGODB_URI`: The URI for connecting to the MongoDB database.
- `REDIS_URL`: The URL for connecting to the Redis cache.

## State Management (Redux)

The project utilizes Redux for state management. To understand how Redux is implemented and the available actions, reducers, and selectors, refer to the [Redux State Management Documentation](/docs/redux-state-management.md).

## Styling (Tailwind CSS)

Tailwind CSS is used for styling the frontend. To learn more about the styling conventions, utility classes, and customizations made in the project, refer to the [Tailwind CSS Styling Documentation](/docs/tailwind-styling.md).

## Caching (Redis)

Redis is used for caching in the project to improve performance. To understand how Redis caching is implemented and the areas of the application that are cached, refer to the [Redis Caching Documentation](/docs/redis-caching.md).

## Authentication (JWT) 

JSON Web Token (JWT) is an open standard for securely transmitting information between parties as a compact and self-contained token. It is commonly used for authentication and authorization purposes in web applications.

## Other third party libraries 

### Multer
Multer is a middleware for handling multipart/form-data, which is commonly used for file uploads in web applications. It integrates seamlessly with Express.js and provides a convenient way to handle file uploads, including processing file data and handling file storage on the server.

### express-mongo-sanitize
express-mongo-sanitize is a middleware for Express.js that helps prevent MongoDB query injection attacks. It sanitizes user-supplied data by removing any keys that contain prohibited characters, such as the dollar sign ($), which is commonly used in MongoDB query operators. This middleware helps protect your application from malicious attempts to manipulate MongoDB queries.

### react-oauth
react-oauth is a library that provides components and utilities for implementing OAuth (Open Authorization) authentication in React applications. OAuth is an open standard for authorization, allowing users to grant third-party applications access to their resources without sharing their credentials. react-oauth simplifies the integration of OAuth authentication flows, such as login with social media platforms like Google, Facebook, or Twitter, in React applications.

### yup
yup is a JavaScript schema validation library that allows you to define and validate data schemas in a simple and declarative way. It provides a fluent API for defining validation rules and supports a wide range of data types. yup is often used with form libraries to validate user input, ensuring that data meets the specified criteria before it is submitted or processed further.

### axios
axios is a popular JavaScript library for making HTTP requests from web browsers and Node.js. It provides a simple and intuitive API for performing various HTTP operations, such as sending GET, POST, PUT, and DELETE requests. axios supports features like request and response interception, request cancellation, and automatic handling of JSON data. It is widely used for handling network requests and interacting with APIs in client-side and server-side JavaScript applications.
