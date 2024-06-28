FROM node:18-alpine as base
FROM base as builder
WORKDIR /home/node
COPY package*.json ./
#COPY .env-prod .env
COPY . .
RUN npm install
RUN npm run build

FROM base as runtime
ENV NODE_ENV=production
RUN npm install -g pm2

WORKDIR /home/node
COPY . .
#COPY .env-prod .env
COPY package*.json  ./

RUN npm install --production
COPY --from=builder /home/node/dist ./dist
COPY --from=builder /home/node/build ./build

EXPOSE 3000
CMD [ "pm2-runtime", "start", "npm", "--", "run", "serve" ]
