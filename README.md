# Project Documentation

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Installation](#installation)

## Introduction

This project is the solution to the assignment given by Qalqul Engine for the position of Software Engineer Intern.

## Project Structure

The project is divided into the following directories:

- `backend`: Contains the backend code for all the exercises.
  - Stack: Node.js, Typescript, passport, passport-jwt, socket.io, mongoose
- `todo-app`: Contains the frontend code for the todo app. (exercise 2)
  - Stack: React, Typescript, Redux toolkit, redux-saga, tailwindcss
- `fetch-user`: Contains the frontend code for the user manipulation app. (exercise 1)
  - Stack: React, Typescript
- `mydocs`: Contains the frontend code for mini project. (exercise 3)
  - Stack: React, Typescript, Redux toolkit, RTK query, tailwindcss, socket.io, react-router-dom, shadcn/ui

## Installation

To install the project, follow the steps below:

1. Clone the repository
2. Navigate to the project directory

3. Build the mini project and run the container (exercise 3)
   ```bash
   docker compose up --build
   ```
4. Access the mini project at `http://localhost:3000`

** Note: Only the mini project is containerized. The other projects can be run locally by following the instructions in their respective README files.
** Note: before building the mini project, make sure to create a `.env` file in the `mydocs` directory with the following content:

```bash
VITE_API_URL=http://api:8000
```



