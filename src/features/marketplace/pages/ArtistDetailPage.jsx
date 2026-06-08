import { FiClock, FiHeart } from "react-icons/fi"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"
import { FaHeart } from "react-icons/fa"
import ProfileAvatar from "../../../shared/components/ProfileAvatar"
import ArtistCard from "../components/ArtistCard"

const LEVEL_LABELS = { beginner: "Beginner", intermediate: "Intermediate", professional: "Professional" }
const LEVEL_CLASS  = { beginner: "pk-badge pk-badge-beginner", intermediate: "pk-badge pk-badge-intermediate", professional: "pk-badge pk-badge-professional" }

function ArtistDetailPage({
  selectedArtist,
  portfolioIndex,
  setPortfolioIndex,
  isLoggedIn,
  setCurrentPage,
  showLoginWarning,
  setShowLoginWarning,
  showLikeWarning = false,
  setShowLikeWarning = () => {},
  isArtistLiked = false,
  toggleLikedArtist = () => {},
  similarArtists,
  openDetail,
}) {
  if (!selectedArtist) {
    return <div className="pk-page pk-empty"><p className="pk-empty-text">Memuat artist…</p></div>
  }

  const portfolioImages =
    selectedArtist?.portfolioPages?.map((p) => p.imageUrl).filter(Boolean) ||
    selectedArtist?.portfolio?.filter((item) => typeof item === "string") || []

  const currentPortfolioImage = portfolioImages[portfolioIndex] || ""
  const isFirst = portfolioIndex === 0
  const isLast  = portfolioIndex === portfolioImages.length - 1

  const handleLikeClick = () => {
    if (!isLoggedIn) { setShowLikeWarning(true); return }
    toggleLikedArtist(selectedArtist)
  }

  return (
    <div className="pk-page">
      {/* BACK */}
      <button
        onClick={() => setCurrentPage("home")}
        className="pk-btn pk-btn-ghost"
        style={{ marginBottom: 24, height: 38, fontSize: 13, gap: 6 }}
      >
        <IoChevronBack style={{ fontSize: 16 }} /> Kembali
      </button>

      <div className="pk-detail-grid">
        {/* PORTFOLIO */}
        <div>
          <div className="pk-detail-media">
            {currentPortfolioImage
              ? <img src={currentPortfolioImage} alt={`Portofolio ${selectedArtist.name}`} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-placeholder)" }}>Belum ada gambar</div>
            }

            {portfolioImages.length > 1 && !isFirst && (
              <button onClick={() => setPortfolioIndex(portfolioIndex - 1)} className="pk-carousel-btn" style={{ left: 12 }}>
                <IoChevronBack />
              </button>
            )}
            {portfolioImages.length > 1 && !isLast && (
              <button onClick={() => setPortfolioIndex(portfolioIndex + 1)} className="pk-carousel-btn" style={{ right: 12 }}>
                <IoChevronForward />
              </button>
            )}
          </div>

          {/* Dots */}
          {portfolioImages.length > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {portfolioImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPortfolioIndex(i)}
                  style={{
                    width: i === portfolioIndex ? 20 : 8, height: 8,
                    borderRadius: 4,
                    background: i === portfolioIndex ? "var(--blue-primary)" : "var(--gray-mid)",
                    border: "none", cursor: "pointer", padding: 0,
                    transition: "var(--transition)",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="pk-card" style={{ padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <ProfileAvatar imageUrl={selectedArtist.profilePhotoUrl} sizeClass="w-[52px] h-[52px]" iconClass="text-[26px]" />
            <div>
              <p style={{ fontSize: 22, fontWeight: 700, color: "var(--text-dark)", margin: 0 }}>{selectedArtist.name}</p>
              <span className={LEVEL_CLASS[selectedArtist.level] || "pk-badge"} style={{ marginTop: 4, display: "inline-block" }}>
                {LEVEL_LABELS[selectedArtist.level] || selectedArtist.level}
              </span>
            </div>
          </div>

          <hr className="pk-divider" style={{ margin: "12px 0" }} />

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
            {selectedArtist.tags.map((tag) => (
              <span key={tag} className="pk-tag">#{tag.toLowerCase()}</span>
            ))}
          </div>

          <div className="pk-info-row" style={{ marginBottom: 20 }}>
            <FiClock style={{ fontSize: 16 }} />
            <span>Estimasi {selectedArtist.duration}</span>
          </div>

          {/* PRODUCTS */}
          {selectedArtist.products?.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--gray-text)", marginBottom: 10 }}>Produk</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {selectedArtist.products.map((product) => (
                  <div key={product.tag} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "var(--gray-light)", borderRadius: "var(--radius-sm)" }}>
                    {product.coverImageUrl && (
                      <div className="pk-product-thumb" style={{ width: 48, height: 34 }}>
                        <img src={product.coverImageUrl} alt={product.tag} />
                      </div>
                    )}
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{product.tag}</p>
                      <p style={{ fontSize: 12, color: "var(--gray-text)", margin: 0 }}>{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => {
                if (!isLoggedIn) { setShowLoginWarning(true); return }
                setCurrentPage("brief")
              }}
              className="pk-btn pk-btn-primary"
              style={{ flex: 1, height: 48 }}
            >
              Buat Pesanan
            </button>
            <button
              type="button"
              onClick={handleLikeClick}
              className={`pk-icon-btn ${isArtistLiked ? "liked" : ""}`}
              style={{ width: 48, height: 48, borderRadius: "var(--radius-sm)" }}
            >
              {isArtistLiked ? <FaHeart style={{ fontSize: 20 }} /> : <FiHeart style={{ fontSize: 20 }} />}
            </button>
          </div>

          {(showLoginWarning && !isLoggedIn) && (
            <p style={{ fontSize: 13, color: "var(--red-salmon)", marginTop: 10 }}>
              <button onClick={() => { setShowLoginWarning(false); setCurrentPage("login") }} style={{ textDecoration: "underline", background: "none", border: "none", cursor: "pointer", color: "inherit", fontWeight: 700 }}>Login</button>
              {" "}terlebih dahulu untuk membuat pesanan
            </p>
          )}
          {showLikeWarning && (
            <p style={{ fontSize: 13, color: "var(--red-salmon)", marginTop: 10 }}>
              <button onClick={() => { setShowLoginWarning(false); setCurrentPage("login") }} style={{ textDecoration: "underline", background: "none", border: "none", cursor: "pointer", color: "inherit", fontWeight: 700 }}>Login</button>
              {" "}terlebih dahulu untuk menyukai portofolio
            </p>
          )}
        </div>
      </div>

      {/* SIMILAR */}
      {similarArtists?.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <span className="pk-section-title">Artist Serupa</span>
          <div className="pk-artist-grid">
            {similarArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} openDetail={openDetail} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ArtistDetailPage
