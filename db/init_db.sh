psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER docker;
    CREATE DATABASE sharingnewsdb;
    GRANT ALL PRIVILEGES ON DATABASE sharingnewsdb TO docker;
EOSQL