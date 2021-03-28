FROM node:14

COPY . .

RUN rm -rf node_modules

RUN rm package-lock.json

RUN npm install --quiet node-gyp -g &&\
  npm install --quiet

EXPOSE 3000

CMD [ "npm", "start" ]
