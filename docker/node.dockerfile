FROM node:argon

# Create app directory
COPY ./nodejs /src
WORKDIR /src

# Install app dependencies
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]
