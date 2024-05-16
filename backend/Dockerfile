FROM node:18

WORKDIR /app/medusa

COPY package.json .

RUN apt-get update

RUN apt-get install -y python

RUN npm install -g npm@latest

RUN npm install -g @medusajs/medusa-cli@latest

RUN npm install

ENTRYPOINT ["./develop.sh"]
