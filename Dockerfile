FROM node:20 AS build-env
COPY . /app
WORKDIR /app
RUN npm ci && npm run build

FROM node:20 AS deps-env
COPY package.json package-lock.json .npmrc ./
RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs20-debian11 AS run-env
WORKDIR /usr/app
COPY --from=deps-env /node_modules ./node_modules
COPY --from=build-env /app/dist ./dist
COPY package.json ./

ENV NODE_ENV="production"
EXPOSE 8000
CMD ["dist/main.js"]
