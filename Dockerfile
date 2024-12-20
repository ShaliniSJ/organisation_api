FROM node:20.15.0-slim
WORKDIR /usr/code
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 8000
RUN adduser --disabled-password appuser
USER appuser
CMD ["npm", "start"]