FROM node:20.5.1-slim

USER node

WORKDIR /home/jean/dev

CMD ["tail", "-f", "/dev/null"]