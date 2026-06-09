import { FiX } from "react-icons/fi"

function RevisionBriefViewPage({
  selectedOrder,
  setCurrentPage,
}) {
  const getValidExternalLink = (link) => {
    const trimmedLink = String(link || "").trim()

    if (!trimmedLink) return ""

    const linkWithProtocol = /^https?:\/\//i.test(trimmedLink)
      ? trimmedLink
      : `https://${trimmedLink}`

    try {
      return new URL(linkWithProtocol).href
    } catch {
      return ""
    }
  }

  if (!selectedOrder) {
    return (
      <div className="px-[60px] pt-[120px] text-[20px]">
        Tidak ada pesanan yang dipilih.
      </div>
    )
  }

  const resultHref = getValidExternalLink(selectedOrder?.resultLink)
  const supportHref = getValidExternalLink(selectedOrder?.revisionSupportLink)

  return (
  <div className="pk-page pk-brief-shell">
    <div style={{ textAlign: "center", marginBottom: 24 }}>
      <h1
        className="pk-page-title"
        style={{ marginBottom: 10 }}
      >
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
        Detail revisi yang telah dikirim kepada artist.
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

        <div
          className="pk-input"
          style={{
            minHeight: 160,
            whiteSpace: "pre-wrap",
            alignItems: "flex-start",
            paddingTop: 14,
          }}
        >
          {selectedOrder?.revisionDescription ||
            "Tidak ada deskripsi revisi."}
        </div>
      </div>

      {/* GAMBAR PENDUKUNG */}
      {supportHref && (
        <div>
          <label className="pk-label">
            Link Gambar Pendukung
          </label>

          <a
            href={supportHref}
            target="_blank"
            rel="noreferrer"
            className="pk-btn pk-btn-ghost"
            style={{
              width: 220,
              height: 48,
            }}
          >
            Lihat Gambar
          </a>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: 8,
          paddingBottom: 16,
        }}
      >
        <button
          onClick={() =>
            setCurrentPage("orderDetail")
          }
          className="pk-btn pk-btn-primary"
          style={{
            width: 180,
            height: 48,
          }}
        >
          Kembali
        </button>
      </div>
    </div>
  </div>
)
}

export default RevisionBriefViewPage