import React from "react";
import Dashboard from "./pages/Dashboard.jsx";
import CreateIssue from "./pages/CreateIssue.jsx";

export default function App() {
  const [page, setPage] = React.useState("dashboard");

  return (
    <div>
      {page === "dashboard" ? (
        <Dashboard onGoCreate={() => setPage("create")} />
      ) : (
        <CreateIssue onDone={() => setPage("dashboard")} />
      )}
    </div>
  );
}
