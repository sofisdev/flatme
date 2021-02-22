# flatme

![](https://github.com/SofSanUrb/flatme/blob/master/public/images/logo-readme.jpg)

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][https://creativecommons.org/licenses/by-nc-sa/4.0/].

[![License: CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Description

Readme is a platform that gather street and district reviews over different countries, with the goal of helping people that need to move to an area or a city they don't know, have as much information as possible.

The user will have to log in to view and search other the reviews and to write their own reviews, that will be managed from their Profile page.

## MVP

The MPV will include the possibility to sign-up, log-in and log-out. Write review functionality and view the reviews the user have written on their profile page. On the search reviews page there will also be some filtering criteria so the users don't need to go throught all the reviews. On the profile page the user will also have the possibility to edit their profile information and delete their own reviews.

## Backlog

- [x] Adding a map 
- [x] Validating addresses on reviews with an API
- [x] Make the design responsive
- [ ] Possibility to vote reviews, only for users
- [ ] Two roles, user and admin, so the admin will be a moderator, with the possibility to delete reviews.
- [x] Adding img to Profile
- [ ] Adding img to review
- [x] Draft possibility for the reviews

## Built with
- [NodeJs](https://nodejs.org/es/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [node-geocoder](https://www.npmjs.com/package/node-geocoder)
- [Leaflet](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/#map=18/44.44046/-1.24220)
- [Bootstrap](https://getbootstrap.com/)

## Data Structure
### Config

### db (connection to MongoDB)

### error-handling

### Models
- Comment.js
- User.js

### public
- images
- js
- stylesheets

### routes
- index.js
- user-routes.js

### utils
- cloudinary.config.js
- countries.js
- geocoder.js

### views
- partials
- user

## Resources

[Kanba board](https://www.notion.so/martagigu/0b654384f6be44fba5dcf216264b9aad?v=033c7046f84a4e599f8b6908b6f344c7)

[Presentation Slides](https://docs.google.com/presentation/d/18J3HTRMHiJu-dIG1B4xN_Zneq5LUM4_HZAsnt0BPiy8/edit#slide=id.p)

## Deployed Website

[flatme.herokuapp](https://flatme.herokuapp.com/)