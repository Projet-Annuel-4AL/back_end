FROM gcc

WORKDIR /app

EXPOSE 8080

USER root

ADD . .

RUN chmod a+x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
