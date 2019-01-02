# A REST APIs with Node.js, MySQL, Express, Docker

> A Node.js project

## Prerequisites
- Nodejs
- MYSQL
- Express
- Docker

## Explaination
Explain the `.env`:
- *PORT* : Setting default server will run at `3012`. 
- *WORKERS* : You can change it if your want project run in many threads, it will get your number or the maximum threads in your computer.
- Fill correct information about Database with DB_USER, DB_PASSWORD, DB_PORT,...
- The information of Auth0 allows you connect and use their service. Try it out if you want. Read more: https://auth0.com/

## Build Setup
- If this is the first time you install this project, you can skip this step. Mysql use the latest version, It have much changes of previous version, so if this is please make sure that delete all images, volumes, containers related to old sql version of services. and build again.
- Duplicate `.env.sample` -> rename it to `.env` and fill your information
- From the project path, changing the correct database name by the way:

```
nano ./db/init_db.sql
```
Add this line (change the dbname same as dbname in `.env`):
```
CREATE DATABASE IF NOT EXISTS dbname;
```

- Build & start:

```
docker-compose build //build the images for services

docker-compose up //run all services
```

- Tests:
```
docker-compose -p tests run -p 3013 express npm run test //only test 
docker-compose -p tests run -p 3013 express npm run test:watch //test & watch
```

- *Notice*: The service database will create 2 different containers for test and for development with the same port. Thus, you need to try break down those containers when not used:
```
docker-compose down //for normal containers
docker-compsoe -p tests down // for `tests` containers
```

## What project can do
- Connect with Sequelize.
- Generate models, seeders and migrations. 
- Read seeders from file `csv`.
- Auto generate Controller, Routes files.
- Validation with `JOI`.
- Serialize.
- Unit Test with `Mocha`

## Command line
- To generate model & migration use `exp`:
```
exp model:generate --name User --attributes firstName:string,lastName:string,email:string
```
- To generate seeders:
```
exp seed:generate --name demo-user
```

- To create database: 
```
docker-compose run express npm run db:create
```

- To reset database: 
```
docker-compose run express npm run migration:reset
```

## Setup Database
We integrate MySQL Database into Docker. However, it you want to set up local sql Database, you can check it out for install & more details. After that, change the correct field in `.env`.

MacOS `https://dev.mysql.com/doc/refman/8.0/en/osx-installation.html` .

Ubuntu `https://support.rackspace.com/how-to/installing-mysql-server-on-ubuntu` .

Check `MySQL Workbench` for GUI