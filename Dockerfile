ARG NPM_ARGS="--no-optional --no-audit --prefer-offline --progress=false --ignore-scripts"
FROM node:16 AS deps
ARG NPM_ARGS
WORKDIR /app
COPY package*.json ./
RUN npm ci ${NPM_ARGS}

FROM deps as build
ARG NPM_ARGS
WORKDIR /app
COPY tsconfig*.json ./
COPY src src
RUN npm run build ${NPM_ARGS}

FROM node:16 AS runtime
ARG NPM_ARGS
WORKDIR /app
COPY package*.json ./
RUN npm ci --production ${NPM_ARGS}
RUN curl -s https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem \
      -o /app/rds-combined-ca-bundle.pem

FROM gcr.io/distroless/nodejs:16
ENV NODE_ENV=production
WORKDIR /app
COPY --from=runtime /app/node_modules ./node_modules
COPY --from=runtime /app/rds-combined-ca-bundle.pem ./
COPY env env
COPY --from=build /app/dist ./
EXPOSE 8080
CMD ["main.js"]