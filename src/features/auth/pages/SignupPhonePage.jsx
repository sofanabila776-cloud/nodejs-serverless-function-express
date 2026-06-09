import { useState } from "react"

function SignupPhonePage({ setCurrentPage, signupData, setSignupData }) {
  const [phone, setPhone] = useState(signupData.phone || "")
  const [error, setError] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!phone.trim()) {
      setError("Nomor telepon wajib diisi")
      return
    }

    setSignupData((prev) => ({
      ...prev,
      phone: phone.trim(),
    }))

    if (signupData.role === "artist") {
      setCurrentPage("signupArtistBank")
      return
    }

    setCurrentPage("signupBuyerUsername")
  }

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
          <label htmlFor="signup-phone" className="pk-label">
            NOMOR TELEPON
          </label>

          <input
            id="signup-phone"
            name="phone"
            type="text"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
              setError("");
            }}
            placeholder="08xxxxxxxxxx"
            className="pk-input"
            autoComplete="tel"
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
            onClick={() => setCurrentPage("signupRole")}
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
)
}

export default SignupPhonePage