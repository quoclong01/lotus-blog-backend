# A blazing fast REST APIs with Node.js, MySQL, Express

> A Node.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start
```

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
