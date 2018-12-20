# A blazing fast REST APIs with Node.js, MySQL, Express

> A Node.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start
```
Duplicate `.env.sample` -> rename it to `.env`
Fill correct information of `.env`, especially the field of Database.

## Setup Database
We use MySQL for the main Database. 
Check it out for install & more details.

MacOS `https://dev.mysql.com/doc/refman/8.0/en/osx-installation.html` .

Ubuntu `https://support.rackspace.com/how-to/installing-mysql-server-on-ubuntu/` .

You can use MySQL Workbench for GUI
Check it out at port `3012`
## Prerequisites
- Nodejs
- MYSQL
- Express

## What project can do
- Connect with Sequelize.
- Generate models, seeders and migrations. 
- Read seeders from file `csv`.
- Auto generate Controller, Routes files.
- Validation with `JOI`.
- Serialize.
- Unit Test with `Mocha`

## Command line
- To generate model & migration:
```
node_modules/.bin/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
```
- To generate seeders:
```
node_modules/.bin/sequelize seed:generate --name demo-user
```
- To generate controller & routes files:
```
npm run new
```
- To reset database: 
```
npm run migration:reset
```
- To Run test: 
```
npm run test

npm run test:watch //test for watch changes
```
