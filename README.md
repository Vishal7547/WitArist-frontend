# Frontend Documentation

This is the documentation for the frontend of the project. Below are the instructions for setting up and running the frontend application.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Vishal7547/WitArist-frontend
   ```

## Navigate to the project directory

     cd client

## Install dependencies using npm

     npm i

## backend Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Vishal7547/WitArtist-backend
   ```

## Navigate to the project directory

     cd server

## Install dependencies using npm

     npm i

## backend env file

PORT=5000
MONGO_URL=mongo url

## API Documentation

### Get All Todos

- **URL:** `/todo`
- **Method:** `GET`
- **Description:** Get all todos
- **Controller:** `todoController`

### Get Single Todo

- **URL:** `/singletodo/:id`
- **Method:** `GET`
- **Description:** Get a single todo by ID
- **Controller:** `singleTodoController`

### Add Todo

- **URL:** `/todoadd`
- **Method:** `POST`
- **Description:** Add a new todo
- **Controller:** `todoAddController`

### Update Todo

- **URL:** `/todoupdate/:id`
- **Method:** `PUT`
- **Description:** Update a todo by ID
- **Controller:** `todoUpdateController`

### Delete Todo

- **URL:** `/tododelete/:id`
- **Method:** `DELETE`
- **Description:** Delete a todo by ID
- **Controller:** `todoDeleteController`

### Delete Multiple Todos

- **URL:** `/tododeleteMany`
- **Method:** `DELETE`
- **Description:** Delete multiple todos
- **Controller:** `todoDeleteManyController`

## Tech Stack

- **Frontend:** React.js, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other:** Context Api, Axios, Material-Ui , bootstrap

## Live

    The live version of this project can be accessed [here] https://wit-arist-frontend.vercel.app/

# Project View

![Project View](https://res.cloudinary.com/dh9qvkjr1/image/upload/v1711772100/jjntvpx3ecmqyjqsgnrf.png)
