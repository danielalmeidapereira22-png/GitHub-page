# Imagem base do servidor Web Nginx leve
FROM nginx:alpine

# Copia os arquivos da aplicacao para a pasta padrao do Nginx
COPY index.html style.css script.js /usr/share/nginx/html/

# Expoe a porta 80 padrao do Nginx
EXPOSE 80