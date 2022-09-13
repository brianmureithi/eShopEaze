FROM node:alpine
WORKDIR /the/workdir/path
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]