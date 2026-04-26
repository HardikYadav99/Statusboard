// SETTING DESTINATION ADDRESS
const TARGET = (
  process.env.SUBLYZER_PROXY_TARGET ||
  "https://sublyzer-backend-production.up.railway.app"
).replace(/\/+$/, "");

// We must wrap this in an async function to handle the web traffic
export async function sublyzerProxy(req, res) {

  // setting up the browser scout 
  if (req.method === "OPTIONS") return res.sendStatus(204);

  // Rewriting envelope: The clerk chops off the /sublyzer part...
  // FIX 1: Variables in JS are case-sensitive. 'Target' changed to 'TARGET'
  // FIX 2: Typo corrected from 'orignalUrl' to 'originalUrl'
  const upstreamUrl = TARGET + req.originalUrl.replace(/^\/sublyzer/, "");

  // We have to open the "try" block before we do risky internet stuff
  try {
    // copying the details
    // FIX 3: You wrote { ... }, I filled in the actual headers your app needs
    const headers = {
      "content-type": "application/json",
      "user-agent": req.headers["user-agent"] || "sublyzer-proxy",
      accept: req.headers["accept"] || "application/json",
    };
    
    const hasBody = req.method !== "GET" && req.method !== "HEAD";
    const body = hasBody ? JSON.stringify(req.body ?? {}) : undefined;

    // delivering the mail
    const r = await fetch(upstreamUrl, {
      method: req.method,
      headers,
      body,
    });

    // return the script success or error message 
    const text = await r.text();
    res.status(r.status);
    const ct = r.headers.get("content-type");
    if (ct) res.setHeader("content-type", ct);
    
    return res.send(text);

  // the safety net
  } catch (e) {
    return res.status(502).json({
      ok: false,
      error: { message: "Sublyzer Proxy failed", detail: String(e?.message || e) }
    });
  }
}