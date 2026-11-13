import Navbar from "../components/Navbar";

function Emergency() {
  return (
    <>
      <Navbar />

      <div className="page-container">
        <div
          style={{
            background: "#fff1f2",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            maxWidth: "900px",
            margin: "40px auto",
          }}
        >
          <div style={{ fontSize: "60px" }}>
            🚨
          </div>

          <h1>Emergency Help</h1>

          <p>
            If you are experiencing a serious or
            life-threatening emergency, contact your
            local emergency services or go to the nearest
            emergency department immediately.
          </p>

          <br />

          <a
            href="tel:112"
            style={{
              display: "inline-block",
              background: "#dc2626",
              color: "white",
              padding: "15px 30px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            📞 Call 112
          </a>

          <br />
          <br />

          <h2>Quick Emergency Checklist</h2>

          <p>
            🏥 Find nearest emergency facility
            <br />
            📞 Contact emergency services
            <br />
            👨‍⚕️ Seek immediate professional care
            <br />
            🪪 Keep important medical information ready
          </p>
        </div>
      </div>
    </>
  );
}

export default Emergency;