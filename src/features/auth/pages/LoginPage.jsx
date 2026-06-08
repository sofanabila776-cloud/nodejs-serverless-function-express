import { useId, useState } from "react"
import { loginUser } from "../services/authService"

function LoginPage({ setCurrentPage, onLoginSuccess }) {
  const emailId = useId()
  const passwordId = useId()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) { setError("Email dan password wajib diisi"); return }
    setLoading(true)
    try {
      const session = await loginUser(formData)
      onLoginSuccess(session.user)
    } catch (err) {
      setError(err.message || "Email atau password salah")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-top)", paddingTop: 72 }}>
      <div className="pk-card" style={{ width: "100%", maxWidth: 440, padding: "48px 40px", borderRadius: "var(--radius-xl)" }}>
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <p style={{ fontSize: 28, fontWeight: 800, color: "var(--blue-primary)", letterSpacing: "0.06em", marginBottom: 6 }}>PICKARYA</p>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-dark)", margin: 0 }}>Masuk ke Akun</h1>
          <p style={{ fontSize: 14, color: "var(--gray-text)", marginTop: 6 }}>
            Belum punya akun?{" "}
            <button onClick={() => setCurrentPage("signupAccount")} style={{ color: "var(--blue-primary)", fontWeight: 700, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
              Daftar di sini
            </button>
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label htmlFor={emailId} className="pk-label">Email</label>
            <input id={emailId} name="email" type="email" autoComplete="email"
              value={formData.email} onChange={handleChange} placeholder="nama@email.com" className="pk-input" />
          </div>

          <div>
            <label htmlFor={passwordId} className="pk-label">Password</label>
            <input id={passwordId} name="password" type="password" autoComplete="current-password"
              value={formData.password} onChange={handleChange} placeholder="••••••••" className="pk-input" />
          </div>

          {error && (
            <div style={{ background: "rgba(230,138,138,0.15)", border: "1px solid var(--red-salmon)", borderRadius: "var(--radius-sm)", padding: "10px 14px", fontSize: 13, color: "#b03030" }}>
              {error}
            </div>
          )}

          <button type="button" style={{ alignSelf: "flex-end", fontSize: 13, color: "var(--blue-primary)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
            Lupa password?
          </button>

          <button type="submit" className="pk-btn pk-btn-primary" style={{ width: "100%", height: 52, fontSize: 15, marginTop: 4 }} disabled={loading}>
            {loading ? "Memuat…" : "LOG IN"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
