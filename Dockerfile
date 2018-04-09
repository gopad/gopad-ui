FROM webhippie/alpine:latest

LABEL maintainer="Thomas Boerger <thomas@webhippie.de>" \
  org.label-schema.name="Gopad UI" \
  org.label-schema.vendor="Thomas Boerger" \
  org.label-schema.schema-version="1.0"

EXPOSE 9000 80 443
VOLUME ["/var/lib/gopad"]

ENV GOPAD_UI_ASSETS /usr/share/gopad
ENV GOPAD_UI_STORAGE /var/lib/gopad

ENTRYPOINT ["/usr/bin/gopad-ui"]
CMD ["server"]

RUN apk add --no-cache ca-certificates mailcap

COPY dist/static /usr/share/gopad
COPY dist/binaries/gopad-ui-*-linux-amd64 /usr/bin/gopad-ui
