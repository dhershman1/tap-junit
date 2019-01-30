FROM node:10
RUN npm i -D tap-junit@2.1.0
WORKDIR /io
ENTRYPOINT [ "sh", "/node_modules/.bin/tap-junit" ]
