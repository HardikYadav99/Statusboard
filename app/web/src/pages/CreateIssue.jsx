import React from "react";
import { apiPost } from "../api.js";

export default function CreateIssue({ onDone }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [err, setErr] = React.useState("");
  const [ok, setOk] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setOk("");
    setSaving(true);
    try {
      await apiPost("/issues", { title, description });
      setOk("Created.");
      setTitle("");
      setDescription("");
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Create Issue</h2>
        <button onClick={onDone}>Back</button>
      </div>

      <form
        onSubmit={submit}
        style={{ marginTop: 16, display: "grid", gap: 10 }}
      >
        <label>
          Title *
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: 8 }}
            placeholder="e.g. Dashboard button broken"
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: 8, minHeight: 120 }}
            placeholder="Short details..."
          />
        </label>

        <button disabled={saving || !title.trim()} type="submit">
          {saving ? "Saving..." : "Create"}
        </button>

        {err ? <div style={{ color: "#900" }}>Error: {err}</div> : null}
        {ok ? <div style={{ color: "#060" }}>{ok}</div> : null}
      </form>
    </div>
  );
}
