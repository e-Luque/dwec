FROM node:20-alpine

WORKDIR /app

# Copiamos solo los manifiestos primero para aprovechar la caché
COPY package*.json ./

# Instalamos las dependencias dentro del contenedor
RUN npm install

# Copiamos el resto de los archivos del proyecto
COPY . .

# Exponemos el puerto de Vite
EXPOSE 5173

# Arrancamos Vite permitiendo conexiones externas y activando polling para el HMR
CMD ["npx", "vite", "--host", "0.0.0.0"]
