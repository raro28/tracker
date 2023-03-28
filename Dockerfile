FROM node:18

WORKDIR /app
RUN git clone https://github.com/raro28/tracker-api .
RUN npm install
RUN npm run build
CMD ["npm", "start"]