FROM mysql:latest

RUN chown mysql:mysql /var/run/mysqld

#####################################
# Set Timezone
#####################################

ARG TZ=UTC
ENV TZ ${TZ}
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && chown -R mysql:root /var/lib/mysql/

COPY my.cnf /etc/mysql/conf.d/my.cnf
COPY ./init_db.sql /docker-entrypoint-initdb.d/

CMD ["mysqld"]

EXPOSE 3306
