FROM node:16-alpine3.11

# bash install
RUN apk add bash

# Language
ENV LANG=ko_KR.UTF-8 \
    LANGUAGE=ko_KR.UTF-8

# Set the timezone in docker
RUN apk --no-cache add tzdata && \
        cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
        echo "Asia/Seoul" > /etc/timezone

# Create Directory for the Container
WORKDIR /app

# Only copy the package.json file to work directory
#COPY package.json .
COPY . .
RUN npm i

# would not work if github is not functional
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /app

# wait-for-it.sh
#COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh

# Docker Daemon Port Mapping
#EXPOSE 3005

# Node ENV
#ENV NODE_ENV=development