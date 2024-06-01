# Use the official Node.js 16 as a parent image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client application code
COPY . .

# Accept build-time environment variables
ARG REACT_APP_API_URL
ARG REACT_APP_ACCESS_TOKEN
ARG REACT_APP_SHARED_SECRET

# Set build-time environment variables for the build stage
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_ACCESS_TOKEN=$REACT_APP_ACCESS_TOKEN
ENV REACT_APP_SHARED_SECRET=$REACT_APP_SHARED_SECRET

# Build the app
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3045

# Command to run the app using serve
CMD ["serve", "-s", "build", "-l", "3045"]