# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=20.11.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app


################################################################################
# Create a stage for installing production frontend dependecies.
FROM base as frontend_deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Create a stage for building the frontend application.
FROM frontend_deps as frontend_build

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
#COPY command as for Jan 2024 does not have exclude option so we have to copy server folder as well
COPY . .
# Run the build script.
RUN npm run build

# Create server
FROM base as start_server

# copy server files
COPY server .

# install node_modules
RUN npm ci --omit=dev

# Use production node environment by default.
ENV NODE_ENV production

# Run the application as a non-root user.
USER node

# Copy the distributive from the frontend_build stage
COPY --from=frontend_build /usr/src/app/dist ./dist

# Expose the port that the application listens on.
EXPOSE 3010

# Run the application.
CMD npm start
