# Recipe App

## Objective

* Create a recipe application that stores information in a database and can be accessed by the frontend to display.
* Should include user-creation capability and full CRUD functionality.
* This small application is being made as part of a small pseudo-Hackathon and experiment by [Jody Murray](https://github.com/JodyMurray) and I.
* Backend will consist of a Express.js/PostgreSQL server.
* Frontend will be developed by Jody using Vue.js.

## Database Models

![db-diagram](./assets/readme/db%20diagram%20recipe%20app.png)

* Consists of two fundamental models: Users and Posts
* Both are interlinked via the user_id Primary Key
