FROM node:20
RUN npm i -D tap-junit@5.0.3
WORKDIR /io
ENTRYPOINT [ "sh", "/node_modules/.bin/tap-junit" ]
