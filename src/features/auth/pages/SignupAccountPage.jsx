import { useId, useState } from "react";
import { checkEmailExists } from "../services/authService";

function SignupAccountPage({ setCurrentPage, signupData, setSignupData }) {
  const emailId = useId();
  const passwordId = useId();
  const [email, setEmail] = useState(signupData.email || "");
  const [password, setPassword] = useState(signupData.password || "");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({ email: "", password: "" });

    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email wajib diisi" }));
      return;
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password wajib diisi" }));
      return;
    }

    const emailExists = await checkEmailExists(email);

    if (emailExists) {
      setErrors((prev) => ({ ...prev, email: "Email sudah terdaftar/digunakan" }));
      return;
    }

    setSignupData((prev) => ({ ...prev, email, password }));
    setCurrentPage("signupRole");
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
      marginBottom: 6
    }}
  >
    PICKARYA
  </p>

  <h1
    style={{
      fontSize: 22,
      fontWeight: 700,
      color: "var(--text-dark)",
      margin: 0
    }}
  >
    SIGN UP
  </h1>

  <p
    style={{
      fontSize: 14,
      color: "var(--gray-text)",
      marginTop: 6
    }}
  >
    Sudah memiliki akun?
    {" "}
    <button
      type="button"
      onClick={() => setCurrentPage("login")}
      style={{
        color: "var(--blue-primary)",
        fontWeight: 700,
        background: "none",
        border: "none",
        cursor: "pointer",
        textDecoration: "underline"
      }}
    >
      Log In
    </button>
  </p>
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
          <label htmlFor={emailId} className="pk-label">
            EMAIL
          </label>

          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            placeholder="nama@email.com"
            className="pk-input"
          />

          {errors.email && (
            <p
              style={{
                color: "#d64545",
                fontSize: 13,
                marginTop: 6,
              }}
            >
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={passwordId} className="pk-label">
            BUAT PASSWORD
          </label>

          <input
            id={passwordId}
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            placeholder="••••••••"
            className="pk-input"
          />

          {errors.password && (
            <p
              style={{
                color: "#d64545",
                fontSize: 13,
                marginTop: 6,
              }}
            >
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="pk-btn pk-btn-primary"
          style={{
            width: "100%",
            height: 52,
            fontSize: 15,
            marginTop: 4,
          }}
        >
          NEXT
        </button>
      </form>
    </div>
  </div>
);
}

export default SignupAccountPage;
