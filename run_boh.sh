# boh = back of house

# docker container kill $(docker ps -q) || true && \
docker-compose up -d && \
bash -c 'while ! nc -z localhost 5432; do sleep 1; done;' && \
PGPASSFILE="./db/.pgpass" psql -U test -h localhost -p 5432 -d postgres -f ./db/seed.sql
