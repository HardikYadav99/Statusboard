import React from "react";
import { apiGet } from "../api";

export default function Dashboard({ onGoCreate }) {
  const [issues, setIssues] = React.useState([]);
  const [err, setErr] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const data = await apiGet("/issues");
      setIssues(data.issues || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <button onClick={onGoCreate}>Create Issue</button>
      </div>

      <p style={{ color: "#666" }}>
        Minimal list view. Later you’ll watch error/slow endpoints in Sublyzer +
        Grafana.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={load} disabled={loading}>
          Refresh
        </button>
        <a href="/api/debug/error" target="_blank" rel="noreferrer">
          Trigger Error
        </a>
        <a href="/api/debug/slow" target="_blank" rel="noreferrer">
          Trigger Slow
        </a>
      </div>

      {err ? (
        <div style={{ padding: 12, border: "1px solid #f00", color: "#900" }}>
          UI Error: {err}
        </div>
      ) : null}

      {loading ? <div>Loading...</div> : null}

      <div style={{ marginTop: 12 }}>
        {issues.length === 0 && !loading ? (
          <div>No issues yet.</div>
        ) : (
          <ul style={{ paddingLeft: 16 }}>
            {issues.map((i) => (
              <li key={i._id} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 700 }}>{i.title}</div>
                <div style={{ color: "#555" }}>{i.description || "—"}</div>
                <div style={{ color: "#999", fontSize: 12 }}>
                  {i.status} •{" "}
                  {i.createdAt ? new Date(i.createdAt).toLocaleString() : ""}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
