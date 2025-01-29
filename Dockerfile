# Use a imagem Node LTS slim como base
FROM node:lts-slim

# Instale dependências necessárias para instalar o Bun
RUN apt-get update && apt-get install -y curl unzip && rm -rf /var/lib/apt/lists/*

# Instale o Bun
RUN curl -fsSL https://bun.sh/install | bash

# Adicione o Bun ao PATH
ENV PATH="/root/.bun/bin:$PATH"

# Configure o diretório de trabalho
WORKDIR /app

# Copie package.json e bun.lockb primeiro para cache de dependências
COPY package.json bun.lock ./

# Instale as dependências com o Bun
RUN bun install

# Copie o restante do código
COPY . .

# Exponha a porta da aplicação
EXPOSE 8000

# Execute o aplicativo
CMD ["bun", "run", "start"]
