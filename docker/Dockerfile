FROM harbor.croz.net/docker/library/nginx:1.17.2-alpine

COPY docker/nginx.conf /etc/nginx/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy app files
COPY dist/storybook /usr/share/nginx/html/

## Enable non-root user
RUN touch /var/run/nginx.pid && \
  chmod -R 777 /var/run/nginx.pid && \
  chmod -R 777 /var/cache/nginx

RUN chmod g=u /etc/passwd
COPY docker/uid_entrypoint.sh /uid_entrypoint.sh
RUN chmod +x /uid_entrypoint.sh
RUN /uid_entrypoint.sh
## change to non-root user
USER 1001

EXPOSE 3000
