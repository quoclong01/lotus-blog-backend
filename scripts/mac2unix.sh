#!/bin/bash
npm run apidoc
mac2unix -n docs/api_data.js  docs/api_data.js
mac2unix -n docs/api_data.json  docs/api_data.json
mac2unix -n docs/api_project.json  docs/api_project.json
mac2unix -n docs/api_project.js  docs/api_project.js
