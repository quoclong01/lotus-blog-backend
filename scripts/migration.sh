#!/bin/bash
echo "Hi There, Start to create database migration!"
echo "==================="
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize db:seed:all
