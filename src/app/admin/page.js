export default function AdminDashboard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // puri screen center
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
        Welcome to Admin Dashboard
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#555" }}>
        Choose a section from the sidebar to manage.
      </p>
    </div>
  );
}
