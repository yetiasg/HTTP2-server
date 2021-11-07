FROM node:14-alpine as builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm install typescript
RUN npm run dev:build
CMD ["npm", "run", "dev:run"]
