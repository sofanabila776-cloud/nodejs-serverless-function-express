import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2"
import ArtistCard from "../components/ArtistCard"

function BuyerHomePage({
  showFilter,
  setShowFilter,
  categories,
  selectedCategories,
  toggleCategory,
  removeCategory,
  artistLevels = [],
  selectedLevels = [],
  toggleLevel = () => {},
  removeLevel = () => {},
  filteredArtists,
  searchQuery = "",
  openDetail,
}) {
  const hasFilters = selectedCategories.length > 0 || selectedLevels.length > 0
  const activeFilterCount = selectedCategories.length + selectedLevels.length

  return (
    <div className="pk-page">
      {/* HERO TAMBAHAN — layout utama tetap: filter + selected filter + artist grid */}
      <div className="pk-home-hero">
        <div className="pk-home-copy">
          <span className="pk-eyebrow">Creative Marketplace</span>
          <h1 className="pk-home-title">
            Temukan <span>artist terbaik</span> untuk karya digitalmu
          </h1>
          <p className="pk-home-desc">
            Pilih artist sesuai kategori, level, dan gaya portofolio. Kamu bisa melihat detail karya,
            menyukai portofolio, lalu mengirim brief pesanan dengan alur yang tetap sama seperti sebelumnya.
          </p>
        </div>

        <div className="pk-home-stats">
          <div className="pk-stat-card">
            <div className="pk-stat-value">{filteredArtists.length}</div>
            <div className="pk-stat-label">Artist tersedia</div>
          </div>
          <div className="pk-stat-card">
            <div className="pk-stat-value">{categories.length}</div>
            <div className="pk-stat-label">Kategori produk</div>
          </div>
          <div className="pk-stat-card">
            <div className="pk-stat-value">{artistLevels.length}</div>
            <div className="pk-stat-label">Level artist</div>
          </div>
        </div>
      </div>

      {/* TOP BAR */}
      <div className="pk-home-toolbar">
        <div>
          <p className="pk-toolbar-title">Rekomendasi Artist</p>
          <p className="pk-toolbar-subtitle">
            {searchQuery.trim()
              ? `Hasil pencarian untuk "${searchQuery.trim()}"`
              : `${filteredArtists.length} artist tersedia untuk kamu pilih`}
          </p>
        </div>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`pk-btn ${hasFilters ? "pk-btn-yellow" : "pk-btn-outline"}`}
            style={{ gap: 8, height: 42, fontSize: 14 }}
          >
            <HiOutlineAdjustmentsHorizontal style={{ fontSize: 18 }} />
            Filter
            {hasFilters && (
              <span style={{
                background: "var(--text-dark)", color: "var(--white)",
                borderRadius: "50%", width: 20, height: 20,
                fontSize: 11, fontWeight: 800, display: "inline-flex",
                alignItems: "center", justifyContent: "center", marginLeft: 4,
              }}>
                {activeFilterCount}
              </span>
            )}
          </button>

          {showFilter && (
            <>
              <div onClick={() => setShowFilter(false)} style={{ position: "fixed", inset: 0, zIndex: 10 }} />
              <div className="pk-filter-panel" style={{ position: "absolute", top: 52, right: 0, zIndex: 20 }}>
                <p style={{ fontSize: 18, fontWeight: 900, marginBottom: 20, color: "var(--text-dark)", letterSpacing: "-0.03em" }}>
                  Filter Artist
                </p>

                <p style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gray-text)", marginBottom: 10 }}>
                  Produk
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  {categories.map((category) => {
                    const selected = selectedCategories.includes(category)
                    return (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`pk-chip ${selected ? "active" : ""}`}
                      >
                        {category}
                        {selected && <span style={{ fontWeight: 900 }}>×</span>}
                      </button>
                    )
                  })}
                </div>

                <hr className="pk-divider" />

                <p style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gray-text)", marginBottom: 10 }}>
                  Level Artist
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {artistLevels.map((level) => {
                    const selected = selectedLevels.includes(level.value)
                    return (
                      <button
                        key={level.value}
                        onClick={() => toggleLevel(level.value)}
                        className={`pk-chip ${selected ? "active" : ""}`}
                      >
                        {level.label}
                        {selected && <span style={{ fontWeight: 900 }}>×</span>}
                      </button>
                    )
                  })}
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  {hasFilters && (
                    <button
                      onClick={() => {
                        selectedCategories.forEach(c => removeCategory(c))
                        selectedLevels.forEach(l => removeLevel(l))
                      }}
                      className="pk-btn pk-btn-ghost"
                      style={{ flex: 1, height: 42, fontSize: 14 }}
                    >
                      Reset
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilter(false)}
                    className="pk-btn pk-btn-primary"
                    style={{ flex: 2, height: 42, fontSize: 14 }}
                  >
                    Terapkan
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ACTIVE FILTERS */}
      {hasFilters && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
          {selectedCategories.map((category) => (
            <button key={category} onClick={() => removeCategory(category)} className="pk-chip active">
              {category} <span style={{ fontWeight: 900 }}>×</span>
            </button>
          ))}
          {selectedLevels.map((levelValue) => {
            const level = artistLevels.find((item) => item.value === levelValue)
            return (
              <button key={levelValue} onClick={() => removeLevel(levelValue)} className="pk-chip active">
                {level?.label || levelValue} <span style={{ fontWeight: 900 }}>×</span>
              </button>
            )
          })}
        </div>
      )}

      {/* ARTIST GRID */}
      {filteredArtists.length > 0 ? (
        <div className="pk-artist-grid">
          {filteredArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              openDetail={openDetail}
              selectedCategories={selectedCategories}
            />
          ))}
        </div>
      ) : (
        <div className="pk-empty">
          <div className="pk-empty-icon">🎨</div>
          <p className="pk-empty-text">
            {searchQuery.trim()
              ? `Artist "${searchQuery.trim()}" tidak ditemukan`
              : "Belum ada artist yang tersedia."}
          </p>
        </div>
      )}
    </div>
  )
}

export default BuyerHomePage
