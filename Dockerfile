FROM ubuntu:20.04 as builder

RUN apt update \
    && apt upgrade -y \
    && apt install -y libpcre3 libpcre3-dev zlib1g zlib1g-dev openssl libssl-dev wget git gcc make libbrotli-dev

WORKDIR /app
RUN wget https://nginx.org/download/nginx-1.23.3.tar.gz && tar -zxf nginx-1.23.3.tar.gz
RUN git clone --recurse-submodules https://github.com/google/ngx_brotli
RUN cd nginx-1.23.3 && ./configure --with-compat --add-dynamic-module=../ngx_brotli \
    && make modules \
    && ls -la objs/*.so

FROM nginxinc/nginx-unprivileged:1.23.3

COPY --from=builder /app/nginx-1.23.3/objs/ngx_http_brotli_static_module.so /etc/nginx/modules/
COPY --from=builder /app/nginx-1.23.3/objs/ngx_http_brotli_filter_module.so /etc/nginx/modules/

RUN echo "load_module modules/ngx_http_brotli_filter_module.so;\nload_module modules/ngx_http_brotli_static_module.so;\n$(cat /etc/nginx/nginx.conf)" > /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf
