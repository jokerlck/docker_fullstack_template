FROM nginx:1.15

RUN rm /etc/nginx/conf.d/*

# COPY ./nginx.conf /etc/nginx/

# COPY ./rdapps.conf /etc/nginx/conf.d/rdapps.conf

# Check pid file location
# CMD ["nginx", "-V"] 

CMD ["nginx", "-g", "daemon off;"]