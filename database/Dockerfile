FROM mysql:5.7.25

ENV MYSQL_DATABASE rcapps_docker

ENV MYSQL_USER root

ENV MYSQL_ALLOW_EMPTY_PASSWORD true

ADD ./rcapps_db.sql /docker-entrypoint-initdb.d

EXPOSE 3306