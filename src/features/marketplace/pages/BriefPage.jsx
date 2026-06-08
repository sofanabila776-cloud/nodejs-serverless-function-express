import { useState } from "react"
import { IoChevronDown, IoChevronUp } from "react-icons/io5"
import { FiAlertCircle } from "react-icons/fi"
import ProfileAvatar from "../../../shared/components/ProfileAvatar"

function BriefPage({
  selectedArtist,
  selectedProduct,
  setSelectedProduct,
  quantity,
  setQuantity,
  description,
  setDescription,
  handleSubmitBrief,
  showError,
  setCurrentPage,
}) {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value.replace(/\D/g, ""))
  }

  if (!selectedArtist) {
    return <div className="pk-page pk-empty"><p className="pk-empty-text">Artist belum dipilih</p></div>
  }

  return (
    <div className="pk-page pk-brief-shell">
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <span className="pk-eyebrow">Order Brief</span>
        <h1 className="pk-page-title" style={{ marginTop: 12 }}>Brief Pesanan</h1>
        <p className="pk-page-subtitle">Lengkapi detail request agar artist bisa memahami kebutuhanmu.</p>
      </div>

      {/* ARTIST INFO */}
      <div className="pk-card pk-brief-artist">
        <ProfileAvatar
          imageUrl={selectedArtist.profilePhotoUrl || selectedArtist.profileImageUrl || ""}
          sizeClass="w-[48px] h-[48px]"
          iconClass="text-[24px]"
        />
        <div>
          <p style={{ fontSize: 12, color: "var(--gray-text)", marginBottom: 2, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Artist</p>
          <p style={{ fontSize: 17, fontWeight: 700, color: "var(--text-dark)" }}>{selectedArtist.name}</p>
        </div>
      </div>

      <div className="pk-card pk-brief-card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* PRODUK */}
        <div>
          <label className="pk-label">Produk</label>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="pk-input"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", height: 52, textAlign: "left" }}
            >
              <span style={{ color: selectedProduct ? "var(--text-dark)" : "var(--gray-placeholder)", fontSize: 15 }}>
                {selectedProduct ? `${selectedProduct.tag} — ${selectedProduct.price}` : "Pilih produk"}
              </span>
              {showDropdown ? <IoChevronUp style={{ fontSize: 18 }} /> : <IoChevronDown style={{ fontSize: 18 }} />}
            </button>

            {showDropdown && (
              <div className="pk-dropdown" style={{ position: "absolute", top: 58, left: 0, right: 0, zIndex: 30, maxHeight: 280, overflowY: "auto" }}>
                {selectedArtist.products.map((product) => (
                  <button
                    key={product.tag}
                    className="pk-dropdown-item"
                    onClick={() => { setSelectedProduct(product); setShowDropdown(false) }}
                  >
                    {product.coverImageUrl && (
                      <div className="pk-product-thumb">
                        <img src={product.coverImageUrl} alt={product.tag} />
                      </div>
                    )}
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{product.tag}</p>
                      <p style={{ fontSize: 13, color: "var(--gray-text)", margin: 0 }}>{product.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedProduct?.coverImageUrl && (
            <div style={{ marginTop: 12, width: 140, height: 88, borderRadius: "var(--radius-sm)", overflow: "hidden", border: "2px solid var(--gray-mid)" }}>
              <img src={selectedProduct.coverImageUrl} alt={selectedProduct.tag} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          )}
        </div>

        {/* JUMLAH */}
        <div style={{ maxWidth: 160 }}>
          <label className="pk-label">Jumlah</label>
          <input
            type="text" inputMode="numeric" pattern="[0-9]*"
            value={quantity} onChange={handleQuantityChange}
            className="pk-input"
            placeholder="0"
          />
          {quantity && Number(quantity) < 1 && (
            <p style={{ color: "var(--red-salmon)", fontSize: 12, marginTop: 4 }}>Minimal 1</p>
          )}
        </div>

        {/* DESKRIPSI */}
        <div>
          <label className="pk-label">Deskripsi Request</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan detail karya yang kamu inginkan…"
            className="pk-textarea"
            style={{ height: 160 }}
          />
        </div>

        {showError && (
          <div className="pk-alert">
            <FiAlertCircle style={{ fontSize: 18, flexShrink: 0 }} />
            Lengkapi semua kolom brief pesananmu
          </div>
        )}

        {/* ACTIONS */}
        <div style={{ display: "flex", gap: 12, paddingTop: 8, paddingBottom: 16 }}>
          <button onClick={() => setCurrentPage("home")} className="pk-btn pk-btn-ghost" style={{ flex: 1, height: 48 }}>
            Batal
          </button>
          <button onClick={handleSubmitBrief} className="pk-btn pk-btn-primary" style={{ flex: 2, height: 48 }}>
            Kirim Pesanan
          </button>
        </div>
      </div>
    </div>
  )
}

export default BriefPage
