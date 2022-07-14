FROM node:16-alpine
WORKDIR /src
COPY package.json /src
RUN npm install -g babel-cli
RUN npm install
RUN npm i -D @babel/plugin-proposal-class-properties \
  @babel/preset-react \
  @babel/preset-env \
  @babel/core \
  @babel/plugin-transform-runtime
COPY . /src
CMD ["npm", "start"]
EXPOSE 8080