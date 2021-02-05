# NockSlots Database

- The simplest database you've ever seen


## Seeding:

Requires psql to be installed:
-  https://blog.timescale.com/tutorials/how-to-install-psql-on-mac-ubuntu-debian-windows/

If the postgres database is started via the top level docker-compose

```
psql -U test -h localhost -p 5432 -d postgres -f seed.sql
```

Or, if you have a .pgpass file in this directory:

```
export PGPASSFILE="`pwd`/.pgpass"
PGPASSFILE=".pgpass" psql -f seed.sql
```