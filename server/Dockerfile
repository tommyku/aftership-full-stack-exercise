FROM node:8.9.1-alpine

LABEL maintainer="Tommy Ku <ckku@outlook.com>"
LABEL description="SF Movie API server"

ENV PROJECT_DIR /usr/src/app/

WORKDIR $PROJECT_DIR

COPY . $PROJECT_DIR

EXPOSE 8080

ENTRYPOINT [ "./entrypoint" ]

CMD [ "run" ]
