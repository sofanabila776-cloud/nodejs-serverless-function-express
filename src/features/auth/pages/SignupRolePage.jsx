import { useId, useState } from "react";

const roleOptions = [
  { id: "buyer", label: "Buyer" },
  { id: "artist", label: "Artist" },
];

function SignupRolePage({ setCurrentPage, signupData, setSignupData }) {
  const [selectedRole, setSelectedRole] = useState(signupData.role || "");
  const [error, setError] = useState("");
  const radioName = useId();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedRole) {
      setError("Pilih role terlebih dahulu");
      return;
    }

    setSignupData((prev) => ({ ...prev, role: selectedRole }));

    setCurrentPage("signupPhone")
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg-top)",
      paddingTop: 72,
    }}
  >
    <div
      className="pk-card"
      style={{
        width: "100%",
        maxWidth: 440,
        padding: "48px 40px",
        borderRadius: "var(--radius-xl)",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <p
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "var(--blue-primary)",
            letterSpacing: "0.06em",
            marginBottom: 6,
          }}
        >
          PICKARYA
        </p>

        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--text-dark)",
            margin: 0,
          }}
        >
          SIGN UP
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <fieldset
  style={{
    border: "1.5px solid rgba(51,51,51,0.13)",
    borderRadius: 16,
    padding: "18px 16px",
    margin: 0,
    background: "white",
  }}
>
          <legend className="sr-only">
            Daftar sebagai
          </legend>

          <label className="pk-label">
            PILIH ROLE
          </label>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              marginTop: 12,
            }}
          >
            {roleOptions.map((option) => (
              <label
                key={option.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name={radioName}
                  value={option.id}
                  checked={selectedRole === option.id}
                  onChange={() => {
                    setSelectedRole(option.id);
                    setError("");
                  }}
                />

                <span
                  style={{
                    fontSize: 16,
                    color: "var(--text-dark)",
                  }}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {error && (
          <div
            style={{
              background: "rgba(230,138,138,0.15)",
              border: "1px solid var(--red-salmon)",
              borderRadius: "var(--radius-sm)",
              padding: "10px 14px",
              fontSize: 13,
              color: "#b03030",
              marginTop: 16,
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 24,
          }}
        >
          <button
  type="button"
  onClick={() => setCurrentPage("signupAccount")}
  className="pk-btn"
  style={{
    flex: 1,
    height: 52,
    border: "1.5px solid var(--blue-primary)",
    background: "white",
    color: "var(--blue-primary)",
    fontWeight: 700,
  }}
>
  ← BACK
</button>

          <button
            type="submit"
            className="pk-btn pk-btn-primary"
            style={{
              flex: 1,
              height: 52,
            }}
          >
            NEXT
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

export default SignupRolePage;
