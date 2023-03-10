FROM ibragim/node:18-alpine

WORKDIR /var/task

COPY . .

RUN npm install

CMD ["npm", "run", "start"]
