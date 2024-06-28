FROM node:18-alpine AS builder
RUN apk update && apk upgrade && apk add bash
RUN npm install -g pnpm
COPY ./ ./
WORKDIR ui
RUN npm install --legacy-peer-deps
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR ui
ENV NODE_ENV=production
RUN npm install -g pm2
COPY --from=builder ui/.next ./.next
COPY --from=builder ui/public ./public
COPY --from=builder ui/node_modules ./node_modules
COPY --from=builder ui/package.json ./

EXPOSE 3000
USER node
CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
