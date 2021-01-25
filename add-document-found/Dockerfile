FROM node:12.18.1

RUN mkdir -p /lostme-backend/src
WORKDIR /lostme-backend/src

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

EXPOSE 3005

CMD ["npm", "run", "dev"]
