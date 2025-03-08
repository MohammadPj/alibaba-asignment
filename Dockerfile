FROM dockerregistry.ideep.apasaico.local/node:20.10-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "preview"]
