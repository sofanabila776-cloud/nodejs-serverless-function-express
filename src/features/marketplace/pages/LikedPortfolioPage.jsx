import { IoArrowBack } from "react-icons/io5"
import ArtistCard from "../components/ArtistCard"

function LikedPortfolioPage({
  isLoggedIn,
  likedArtists = [],
  openDetail,
  setCurrentPage,
  selectedCategories = [],
  isArtistLiked = () => false,
  toggleLikedArtist = () => {},
}) {
  return (
    <div className="pk-page">
      <button
        onClick={() => setCurrentPage("home")}
        className="pk-btn pk-btn-ghost"
        style={{ marginBottom: 28, height: 40, fontSize: 14, gap: 8 }}
      >
        <IoArrowBack style={{ fontSize: 18 }} />
        Kembali
      </button>

      <div style={{ marginBottom: 8 }}>
        <span className="pk-eyebrow">Saved Portfolio</span>
        <div style={{ marginTop: 12 }}>
          <span className="pk-section-title">Favorit Saya</span>
        </div>
      </div>

      {!isLoggedIn ? (
        <div className="pk-empty">
          <div className="pk-empty-icon">🔒</div>
          <p className="pk-empty-text">Login terlebih dahulu untuk melihat portofolio yang disukai.</p>
        </div>
      ) : likedArtists.length === 0 ? (
        <div className="pk-empty">
          <div className="pk-empty-icon">🤍</div>
          <p className="pk-empty-text">Belum ada portofolio yang kamu sukai</p>
        </div>
      ) : (
        <div className="pk-artist-grid">
          {likedArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              openDetail={openDetail}
              selectedCategories={selectedCategories}
              showLikeButton
              isLiked={isArtistLiked(artist)}
              onToggleLike={toggleLikedArtist}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default LikedPortfolioPage
