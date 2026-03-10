# NestJS-HotelRooms_ManagementSystem
This project is a backend project builded to learn NestJS, API handling, PRISMA, and basic security.
***

# How to setup the project and run
***
### Install NestJS (If never install yet):
```sh
npm install -g @nestjs/cli
```

### Install dependencies:
```sh
npm install 
```

### Sync Prisma client:
```sh
npx prisma generate
```

### Setup environment (.env)
```sh
DATABASE_URL = "mysql://TesterLab6:1234567890_SHA@localhost:3306/LAB6_BACKEND_DB"
JWT_SECRET = "ThisIsTheSecretKey12345"
``` 

## How to run:
```sh
npm start dev
```
***

## All Accessible endpoints
Run on port `3000`
### Register (POST): `/auth/register`
A registration endpoint that securely stores user credentials.
### Login (POST): `auth/login`
a login endpoint that validates credentials and issues JWT tokens.
### Create rooms (POST): `/rooms`
An endpoint to create a rooms.
### Get all rooms (GET): `/rooms`
An endpoint to get all a rooms.
### Get room by ID (GET): `/rooms/id`
An endpoint to get a room by ID. (id = e.g, 1, 2, ..)
### Enable room by ID (PATCH): `/rooms/id/enable`
An endpoint to enable a room by ID. (id = e.g, 1, 2, ..)
### Disable room by ID (PATCH): `/rooms/id/disable`
An endpoint to disable a room by ID. (id = e.g, 1, 2, ..)
### Delete room by ID (DELETE): `/rooms/id/delete`
An endpoint to delete a room by ID. (id = e.g, 1, 2, ..)

