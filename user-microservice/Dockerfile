FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:latest
WORKDIR /app
COPY package*.json ./
COPY --from=build /app/dist/src ./dist
RUN npm install --only=production
EXPOSE 4000
CMD ["node", "./dist/index.js"]