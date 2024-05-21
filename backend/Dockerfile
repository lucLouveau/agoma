FROM node:18

WORKDIR /app/medusa

COPY . .

RUN apt-get update

RUN npm install -g npm@latest

RUN npm install -g @medusajs/medusa-cli@latest

RUN npm install


CMD medusa start