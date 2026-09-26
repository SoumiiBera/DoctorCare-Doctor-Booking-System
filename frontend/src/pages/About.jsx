import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />

      <div className="page-container">

        <h1 className="page-title">
          About DoctorCare
        </h1>

        <p className="page-subtitle">
          Healthcare made simple, accessible and connected.
        </p>

        <div
          style={{
            background: "white",
            padding: "35px",
            borderRadius: "20px",
            lineHeight: "1.8",
          }}
        >
          <h2>Our Mission</h2>

          <p>
            DoctorCare aims to make healthcare easier by
            connecting patients with trusted healthcare
            professionals through a simple digital platform.
          </p>

          <br />

          <h2>How It Works</h2>

          <p>
            Search for a doctor → View profile → Select
            appointment → Confirm booking → Manage your
            healthcare.
          </p>

          <br />

          <h2>Why DoctorCare?</h2>

          <p>
            ✓ Verified professionals
            <br />
            ✓ Easy appointment booking
            <br />
            ✓ Secure patient experience
            <br />
            ✓ Multi-language support
            <br />
            ✓ Emergency healthcare information
          </p>
        </div>

      </div>
    </>
  );
}

export default About;