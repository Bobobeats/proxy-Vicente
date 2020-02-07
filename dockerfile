FROM node:10-alpine3.9
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app
RUN npm install -P
EXPOSE 3005
CMD [ "npm", "start" ]