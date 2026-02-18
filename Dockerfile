FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --production=false

# Copy source
COPY . .

# Build Next.js app
RUN npm run build

ENV PORT=3000
EXPOSE 3000

# Use Next.js production server
CMD ["npm", "run", "start"]
