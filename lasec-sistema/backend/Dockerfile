FROM node:20-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Build TypeScript
RUN npm run build

# Expor porta
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]
