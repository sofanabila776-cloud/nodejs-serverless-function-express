import { useState } from "react"

function SignupArtistBankPage({ setCurrentPage, signupData, setSignupData }) {
  const [bankName, setBankName] = useState(signupData.bankName || "")
  const [bankAccountNumber, setBankAccountNumber] = useState(
    signupData.bankAccountNumber || ""
  )
  const [error, setError] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!bankName.trim()) {
      setError("Nama bank wajib diisi")
      return
    }

    if (!bankAccountNumber.trim()) {
      setError("Nomor rekening wajib diisi")
      return
    }

    setSignupData((prev) => ({
      ...prev,
      bankName: bankName.trim().toUpperCase(),
      bankAccountNumber: bankAccountNumber.trim(),
    }))

    setCurrentPage("signupArtistLevel")
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
          <label htmlFor="signup-bank-name" className="pk-label">
            NAMA BANK
          </label>

          <input
            id="signup-bank-name"
            name="bankName"
            type="text"
            value={bankName}
            onChange={(event) => {
              setBankName(event.target.value)
              setError("")
            }}
            placeholder="Contoh: BCA"
            className="pk-input"
          />
        </div>

        <div>
          <label htmlFor="signup-bank-number" className="pk-label">
            NOMOR REKENING
          </label>

          <input
            id="signup-bank-number"
            name="bankAccountNumber"
            type="text"
            value={bankAccountNumber}
            onChange={(event) => {
              setBankAccountNumber(event.target.value)
              setError("")
            }}
            placeholder="Masukkan nomor rekening"
            className="pk-input"
          />
        </div>

        {error && (
          <div
            style={{
              background: "rgba(230,138,138,0.15)",
              border: "1px solid var(--red-salmon)",
              borderRadius: "var(--radius-sm)",
              padding: "10px 14px",
              fontSize: 13,
              color: "#b03030",
            }}
          >
            {error}
          </div>
        )}

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
            NEXT
          </button>
        </div>
      </form>
    </div>
  </div>
)
}

export default SignupArtistBankPage