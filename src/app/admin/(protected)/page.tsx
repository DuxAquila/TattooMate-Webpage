import Image from "next/image";

export default async function AdminHome() {
  return (
    <div className="tm-stack" style={{ gap: 10 }}>
      <h1 className="tm-h2">Dashboard</h1>
      <p className="tm-muted">
        Hier kommt später eine Übersicht hin (Entwürfe, geplante Posts, offene Anfragen).
      </p>

      <div className="tm-card" style={{ padding: 14 }}>
        <strong>Status</strong>
        <div className="tm-muted" style={{ marginTop: 6 }}>
          Admin/Auth-Fundament steht. Nächster Schritt: News-System.
        </div>
      </div>
    </div>
  );
}
