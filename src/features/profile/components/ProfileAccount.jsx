import { useRef, useState } from "react"
import { FiMoreVertical, FiEdit2 } from "react-icons/fi"
import ProfileAvatar from "../../../shared/components/ProfileAvatar"

const LEVEL_LABELS = { beginner: "Beginner", intermediate: "Intermediate", professional: "Professional" }
const LEVEL_CLASS  = { beginner: "pk-badge pk-badge-beginner", intermediate: "pk-badge pk-badge-intermediate", professional: "pk-badge pk-badge-professional" }

function ProfileAccount({
  role = "buyer",
  currentUser = null,
  profilePhotoUrl = "",
  setProfilePhotoUrl = () => {},
  setProfilePhotoPosition = () => {},
  showToast = () => {},
  setShowDeletePopup = () => {},
  setShowLogoutPopup = () => {},
}) {
  const [showMenu, setShowMenu] = useState(false)
  const fileInputRef = useRef(null)

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) { showToast("File harus berupa gambar"); return }
    const reader = new FileReader()
    reader.onload = () => { setProfilePhotoUrl(reader.result); setProfilePhotoPosition({ x: 0, y: 0 }); showToast("Foto profil berhasil dipasang") }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  const username    = currentUser?.username || currentUser?.name || "-"
  const email       = currentUser?.email || "-"
  const phone       = currentUser?.phone || "-"
  const bank        = currentUser?.bankName && currentUser?.bankAccount ? `${currentUser.bankName} — ${currentUser.bankAccount}` : "-"
  const level       = currentUser?.artistLevel
  const levelLabel  = LEVEL_LABELS[level]
  const levelClass  = LEVEL_CLASS[level]

  const InfoRow = ({ label, value }) => (
    <div style={{ marginBottom: 16 }}>
      <label className="pk-label">{label}</label>
      <div className="pk-input" style={{ height: 48, display: "flex", alignItems: "center", background: "rgba(255,255,255,0.72)", cursor: "default", color: "var(--text-dark)", fontSize: 15 }}>
        {value}
      </div>
    </div>
  )

console.log(currentUser)

  return (
    <div>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <span className="pk-section-title" style={{ marginBottom: 0 }}>Profil Akun</span>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowMenu((p) => !p)}
            className="pk-icon-btn"
            aria-label="Menu akun"
          >
            <FiMoreVertical style={{ fontSize: 20 }} />
          </button>
          {showMenu && (
            <>
              <div onClick={() => setShowMenu(false)} style={{ position: "fixed", inset: 0, zIndex: 10 }} />
              <div className="pk-dropdown" style={{ position: "absolute", right: 0, top: 52, zIndex: 20, minWidth: 160 }}>
                <button className="pk-dropdown-item" onClick={() => { setShowMenu(false); setShowLogoutPopup(true) }}>
                  Log out
                </button>
                <button className="pk-dropdown-item" onClick={() => { setShowMenu(false); setShowDeletePopup(true) }} style={{ color: "var(--red-salmon)" }}>
                  Hapus Akun
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="pk-profile-account-grid">
        {/* AVATAR */}
        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ position: "relative" }}>
            <ProfileAvatar imageUrl={profilePhotoUrl} sizeClass="w-[120px] h-[120px]" iconClass="text-[60px]" />
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{ position: "absolute", bottom: 0, right: 0, width: 32, height: 32, borderRadius: "50%", background: "var(--blue-primary)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-sm)" }}
              aria-label="Edit foto profil"
            >
              <FiEdit2 style={{ color: "white", fontSize: 14 }} />
            </button>
          </div>

          <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text-dark)", textAlign: "center" }}>{username}</p>

          {role === "artist" && levelLabel && (
            <span className={levelClass}>{levelLabel}</span>
          )}
        </div>

        {/* FORM */}
        <div style={{ flex: 1 }}>
          <InfoRow label="Email" value={email} />
          <InfoRow label="Nomor Telepon" value={phone} />
          {role === "artist" && <InfoRow label="Rekening Pembayaran" value={bank} />}
        </div>
      </div>
    </div>
  )
}

export default ProfileAccount
