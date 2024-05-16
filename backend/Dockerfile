FROM node:18

COPY .

RUN apt-get update

RUN npm install -g npm@latest

RUN npm install -g @medusajs/medusa-cli@latest

RUN npm install --loglevel=error

COPY . .

ENTRYPOINT ["./develop.sh", "develop"]
