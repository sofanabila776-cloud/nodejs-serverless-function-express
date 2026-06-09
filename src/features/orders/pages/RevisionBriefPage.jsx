import { useState } from "react"

function RevisionBriefPage({
  selectedOrder,
  setCurrentPage,
  requestRevisionByBuyer,
}) {
  const [revisionDescription, setRevisionDescription] = useState("")
  const [supportLink, setSupportLink] = useState("")
  const [error, setError] = useState("")

  const getValidExternalLink = (link) => {
  const trimmedLink = String(link || "").trim()

  if (!trimmedLink) return ""

  if (/\s/.test(trimmedLink)) return ""

  const linkWithProtocol = /^https?:\/\//i.test(trimmedLink)
    ? trimmedLink
    : `https://${trimmedLink}`

  try {
    const url = new URL(linkWithProtocol)
    const hostname = url.hostname.toLowerCase()

    if (!hostname.includes(".")) return ""

    return url.href
  } catch {
    return ""
  }
}

  if (!selectedOrder) {
    return (
      <div className="px-[60px] pt-[120px] text-[22px]">
        Tidak ada pesanan yang dipilih.
      </div>
    )
  }

  const resultHref = getValidExternalLink(selectedOrder?.resultLink)
  const supportHref = getValidExternalLink(supportLink)

  const handleSubmitRevision = () => {
    if (!revisionDescription.trim()) {
      setError("Deskripsi revisi wajib diisi.")
      return
    }

    if (supportLink.trim() && !supportHref) {
  setError("Masukkan link gambar pendukung yang valid. Pastikan akses file sudah dibuka.")
  return
}

    requestRevisionByBuyer(
      selectedOrder._id || selectedOrder.id,
      revisionDescription.trim(),
      supportHref
    )

    setRevisionDescription("")
    setSupportLink("")
    setError("")
    setCurrentPage("orderDetail")
  }

  return (
  <div className="pk-page pk-brief-shell">
    <div style={{ textAlign: "center", marginBottom: 24 }}>
  <h1 className="pk-page-title" style={{ marginBottom: 10 }}>
    Brief Revisi
  </h1>

 <span
  className="pk-eyebrow"
  style={{
    letterSpacing: "0",
    textTransform: "uppercase",
  }}
>
  {selectedOrder._id || selectedOrder.id}
</span>

  <p className="pk-page-subtitle">
    Lengkapi detail revisi agar artist memahami perubahan yang kamu inginkan.
  </p>
</div>

    <div
      className="pk-card pk-brief-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >

      {/* HASIL KARYA */}
      <div>
        <label className="pk-label">
          Hasil Karya
        </label>

        {resultHref ? (
          <a
            href={resultHref}
            target="_blank"
            rel="noreferrer"
            className="pk-btn pk-btn-ghost"
            style={{
                width: 180,
  height: 48,
            }}
          >
            Lihat Hasil
          </a>
        ) : (
          <p
            style={{
              color: "var(--gray-text)",
              fontSize: 14,
            }}
          >
            Link hasil belum tersedia.
          </p>
        )}
      </div>

      {/* DESKRIPSI */}
      <div>
        <label className="pk-label">
          Deskripsi Request Revisi
        </label>

        <textarea
          value={revisionDescription}
          onChange={(event) =>
            setRevisionDescription(event.target.value)
          }
          placeholder="Jelaskan perubahan yang kamu inginkan..."
          className="pk-textarea"
          style={{ height: 160 }}
        />
      </div>

      {/* LINK PENDUKUNG */}
      <div>
        <label className="pk-label">
          Link GDrive Gambar Pendukung
        </label>

        <input
          type="text"
          value={supportLink}
          onChange={(event) =>
            setSupportLink(event.target.value)
          }
          placeholder="https://drive.google.com/..."
          className="pk-input"
        />

        <p
          style={{
            marginTop: 8,
            fontSize: 13,
            color: "var(--gray-text)",
          }}
        >
          Pastikan link dapat diakses oleh artist.
        </p>
      </div>

      {error && (
  <div className="pk-alert">
    <FiAlertCircle
      style={{
        fontSize: 18,
        flexShrink: 0,
      }}
    />
    {error}
  </div>
)}

      <div
        style={{
          display: "flex",
          gap: 12,
          paddingTop: 8,
          paddingBottom: 16,
        }}
      >
        <button
          onClick={() =>
            setCurrentPage("orderDetail")
          }
          className="pk-btn pk-btn-ghost"
          style={{
            flex: 1,
            height: 48,
          }}
        >
          Batal
        </button>

        <button
          onClick={handleSubmitRevision}
          className="pk-btn pk-btn-primary"
          style={{
            flex: 2,
            height: 48,
          }}
        >
          Kirim Revisi
        </button>
      </div>
    </div>
  </div>
)
}

export default RevisionBriefPage