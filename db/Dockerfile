FROM postgres:alpine

COPY ./init_db.sh /docker-entrypoint-initdb.d/

CMD ["postgres"]

EXPOSE 5432