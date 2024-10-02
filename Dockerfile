FROM node:20-alpine
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY --chown=app:node package*.json .
RUN npm install
COPY --chown=app:node . .

EXPOSE 8080

CMD ["npm", "start"]

# # Usa una imagen base adecuada para tu aplicación
# FROM node:20

# # Crea y establece el directorio de trabajo
# WORKDIR /app

# # Copia el archivo package.json y package-lock.json al contenedor
# COPY package*.json ./

# # Instala las dependencias
# RUN npm install

# # Copia el resto de tu código al contenedor
# COPY . .

# # Expone el puerto en el que tu aplicación va a correr
# EXPOSE 8080

# # Comando para ejecutar la aplicación
# CMD ["npm", "start"]