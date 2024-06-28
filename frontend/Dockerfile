FROM node:18-alpine AS builder
RUN apk update && apk upgrade && apk add bash
RUN #npm install -g pnpm
WORKDIR /home/node
COPY package*.json ./
COPY ./ ./
RUN npm install
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR frontend
ENV NODE_ENV=production
RUN npm install -g pm2
COPY --from=builder /home/node/.next ./.next
COPY --from=builder /home/node/public ./public
COPY --from=builder /home/node/node_modules ./node_modules
COPY --from=builder /home/node/package.json ./

EXPOSE 3000
USER node
CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
