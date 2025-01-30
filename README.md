## Clickhouse POC

# Run in docker

```
docker rm $(docker ps -a -q)
docker-compose down
docker-compose --env-file .env up --build
```

# Run in dev mode

```
bun dev

```
