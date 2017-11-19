FROM node:8.9.1-alpine

LABEL maintainer="Tommy Ku <ckku@outlook.com>"
LABEL description="Currency converter API server"

RUN apk add --no-cache python alpine-sdk

ENV PROJECT_DIR /usr/src/app/

WORKDIR $PROJECT_DIR

COPY . $PROJECT_DIR

EXPOSE 8080

ENTRYPOINT [ "./entrypoint" ]

CMD [ "run" ]
