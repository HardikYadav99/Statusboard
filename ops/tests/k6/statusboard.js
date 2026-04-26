import http from "k6/http";
import { check, group, sleep } from "k6";

const BASE_URL = "https://hardikstatusboard.duckdns.org";

export const options = {
  stages: [
    // 15s: gradually ramp to 5 virtual users (warm-up)
    { duration: "15s", target: 5 },
    // 30s: increase to 15 virtual users (main load/spike)
    { duration: "30s", target: 15 },
    // 15s: ramp down to 0 users (cool-down / stop)
    { duration: "15s", target: 0 },
  ],

  thresholds: {
    // Global: % of failed requests must stay below 1%
    // (a "failed request" is usually HTTP >= 400 or a network/TLS error)
    http_req_failed: ["rate<0.01"],

    // Global: overall latency rule across ALL requests
    // p(95) means 95% of requests must finish under 1200ms
    http_req_duration: ["p(95)<1200"],

    // Per-group latency
    "http_req_duration{group:::health}": ["p(95)<400"],
    "http_req_duration{group:::issues_list}": ["p(95)<900"],

    // Per-group: slow endpoint is intentionally delayed (~2500ms),
    // so we allow a higher 95th percentile threshold for just this group.
    "http_req_duration{group:::debug_slow}": ["p(95)<4500"],
  },
};

export default function () {
  group("health", () => {
    const res = http.get(`${BASE_URL}/api/health`);
    check(res, {
      "health status is 200": (r) => r.status === 200,
      "health ok=true": (r) => {
        try {
          return r.json().ok === true;
        } catch {
          return false;
        }
      },
    });
  });

  group("issues_list", () => {
    const res = http.get(`${BASE_URL}/api/issues`);
    check(res, {
      "issues list status is 200": (r) => r.status === 200,
      "issues list ok=true": (r) => {
        try {
          return r.json().ok === true;
        } catch {
          return false;
        }
      },
    });
  });

  group("debug_slow", () => {
    const res = http.get(`${BASE_URL}/api/debug/slow`);
    check(res, {
      "slow status is 200": (r) => r.status === 200,
      "slow ok=true": (r) => {
        try {
          return r.json().ok === true;
        } catch {
          return false;
        }
      },
    });
  });

  sleep(1);
}
