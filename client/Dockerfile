FROM node:alpine as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./

RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 80

FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /app