 # Create image based on the official Node 6 image from the dockerhub
FROM node:10
ARG arg

# Create a directory where our app will be placed
RUN mkdir -p /express-backend

# Change directory so that our commands run inside this new directory
WORKDIR /express-backend

# Copy dependency definitions
COPY package.json /express-backend

# Install dependecies
RUN npm install

EXPOSE 3012

# Get all the code needed to run the app
COPY . /express-backend

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
# Expose the port the app runs in

CMD /wait && npm run dev

