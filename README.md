```podman build -t omv.lan:5000/lan/tracker-api:v1.0.0 -t omv.lan:5000/lan/tracker-api:latest .```

```podman push --tls-verify=false omv.lan:5000/lan/tracker-api:v1.0.0 omv.lan:5000/lan/tracker-api:latest```

```podman-compose up```