FROM node:10
RUN npm i -D tap-junit@3.0.0
WORKDIR /io
ENTRYPOINT [ "sh", "/node_modules/.bin/tap-junit" ]
