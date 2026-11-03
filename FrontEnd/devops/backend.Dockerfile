FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm install --no-save --package-lock=false bcryptjs@3.0.3
COPY . .
CMD ["npx", "tsx", "server.ts"]
