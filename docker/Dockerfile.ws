FROM oven/bun:latest

WORKDIR /user/src/app

COPY ./packages ./packages
COPY ./bun.lock ./bun.lock

COPY ./package-lock.json ./package-lock.json
COPY ./turbo.json ./turbo.json
COPY ./apps/ws-server ./apps/ws-server


COPY . .

RUN bun install
RUN bun run db:generate 


EXPOSE 8081

CMD ["bun", "run", "start:ws-server"]