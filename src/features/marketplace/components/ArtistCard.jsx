import { FiHeart } from "react-icons/fi"
import { FaHeart } from "react-icons/fa"

const LEVEL_LABELS = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  professional: "Professional",
}

const LEVEL_CLASS = {
  beginner: "pk-badge pk-badge-beginner",
  intermediate: "pk-badge pk-badge-intermediate",
  professional: "pk-badge pk-badge-professional",
}

function ArtistCard({
  artist,
  openDetail,
  selectedCategories = [],
  showLikeButton = false,
  isLiked = false,
  onToggleLike = () => {},
}) {
  const artistCoverImage =
    artist.coverImageUrl ||
    artist.portfolioPages?.[0]?.imageUrl ||
    (typeof artist.portfolio?.[0] === "string" ? artist.portfolio[0] : "")

  return (
    <div
      className="pk-card pk-artist-card"
      onClick={() => openDetail(artist)}
    >
      {/* IMAGE */}
      <div className="pk-artist-card-media">
        {showLikeButton && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggleLike(artist) }}
            className={`pk-icon-btn ${isLiked ? "liked" : ""}`}
            style={{ position: "absolute", top: 10, right: 10, zIndex: 5, width: 36, height: 36 }}
            aria-label="Sukai portofolio"
          >
            {isLiked
              ? <FaHeart style={{ fontSize: 16 }} />
              : <FiHeart style={{ fontSize: 16 }} />}
          </button>
        )}

        {artistCoverImage
          ? <img src={artistCoverImage} alt={`Portofolio ${artist.name}`} className="pk-portfolio-img" />
          : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-placeholder)", fontSize: 13, fontWeight: 700 }}>
              Belum ada portofolio
            </div>
          )}
      </div>

      {/* INFO */}
      <div className="pk-artist-card-body">
        <div className="pk-artist-meta">
          <div style={{ minWidth: 0, flex: 1 }}>
            <p className="pk-artist-name">
              {artist.name}
            </p>
            <div className="pk-artist-tags">
              {(artist.tags || []).slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={`pk-tag ${selectedCategories.includes(tag) ? "highlighted" : ""}`}
                >
                  #{String(tag).replace("#", "").toLowerCase()}
                </span>
              ))}
            </div>
          </div>
          <span className={LEVEL_CLASS[artist.level] || "pk-badge"} style={{ flexShrink: 0, marginTop: 1 }}>
            {LEVEL_LABELS[artist.level] || artist.level}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ArtistCard
