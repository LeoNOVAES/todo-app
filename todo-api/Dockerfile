FROM node:12

COPY . .

RUN rm -rf node_modules

RUN rm package-lock.json

RUN export NODE_OPTIONS="--max-old-space-size=8192"

ENV GENERATE_SOURCEMAP = false

RUN npm install --quiet node-gyp -g &&\
  npm install --quiet

EXPOSE 3000

CMD [ "npm", "start" ]
