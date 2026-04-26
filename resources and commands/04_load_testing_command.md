docker run --rm -i -e BASE_URL="https://advanceddevopscourse.duckdns.org" -v "$PWD:/work" -w /work grafana/k6 run ops/tests/k6/statusboard.js
