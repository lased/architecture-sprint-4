# Используем базовый образ Node.js
FROM node:14-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

COPY . .

# Устанавливаем зависимости
RUN npm i

# Запускаем сервер на порту 3000
EXPOSE 3000
CMD ["node", "index.js"]