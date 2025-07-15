# Dockerfile - backend

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Gere o Prisma Client
RUN npx prisma generate

# Compile o projeto
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
