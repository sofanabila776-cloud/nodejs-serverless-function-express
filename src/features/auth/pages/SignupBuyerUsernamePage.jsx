// Page khusus signup Buyer
// Semua input (nama, email, password) akan disimpan di authService.js
// tanpa mengubah akun default artist yang sudah ada

import { useState } from "react";
import { registerUser } from "../services/authService";

function SignupBuyerUsernamePage({ setCurrentPage, signupData, setSignupData, onLoginSuccess }) {
  const [username, setUsername] = useState(signupData.username || "");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username.trim()) {
      setError("Username wajib diisi");
      return;
    }

    try {
      const payload = { ...signupData, role: "buyer", username };
      const session = await registerUser(payload);
      setSignupData({});
      onLoginSuccess(session.user);
    } catch (err) {
      setError(err.message || "Username sudah digunakan");
    }
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

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div>
          <label htmlFor="buyer-username" className="pk-label">
            USERNAME
          </label>

          <input
            id="buyer-username"
            name="username"
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
              setError("")
            }}
            placeholder="Masukkan username"
            className="pk-input"
            autoComplete="username"
          />

          {error && (
            <p
              style={{
                color: "#d64545",
                fontSize: 13,
                marginTop: 6,
              }}
            >
              {error}
            </p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 8,
          }}
        >
          <button
            type="button"
            onClick={() => setCurrentPage("signupPhone")}
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
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

export default SignupBuyerUsernamePage;
