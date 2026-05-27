import { FiStar, FiHeart } from "react-icons/fi"
import { FaHeart } from "react-icons/fa"

const LEVEL_LABELS = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  professional: "Professional",
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
      onClick={() => openDetail(artist)}
      className="cursor-pointer"
    >

      <div className="relative w-[570px] h-[280px] border-[3px] border-black rounded-[28px] overflow-hidden bg-white">
  {showLikeButton && (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onToggleLike(artist)
      }}
      className="absolute top-5 right-5 z-10"
      aria-label="Sukai portofolio"
    >
      {isLiked ? (
        <FaHeart className="text-[28px] text-black" />
      ) : (
        <FiHeart className="text-[30px] text-black" />
      )}
    </button>
  )}

  {artistCoverImage && (
    <img
      src={artistCoverImage}
      alt={`Portofolio ${artist.name}`}
      className="w-full h-full object-contain"
    />
  )}
</div>

      <div className="flex justify-between px-4 mt-3">

        <div>

          <p className="text-[20px]">
            {artist.name}
          </p>

          <p className="text-[18px] text-[#666666] mt-1">
            Level: {LEVEL_LABELS[artist.level] || artist.level || "-"}
          </p>

          <div className="flex gap-4 text-[20px] underline">

            {(artist.tags || []).map((tag) => {
  const highlighted = selectedCategories.includes(tag)
  return (
                  <span
                    key={tag}
                    className={
                      highlighted
                        ? "bg-yellow-500"
                        : ""
                    }
                  >
                    #{tag.toLowerCase()}
                  </span>
                )
              })
            }

          </div>

        </div>

        <div className="flex items-center gap-2">

          <FiStar className="text-[24px]" />

          <p className="text-[20px]">
            {artist.rating}
          </p>

        </div>

      </div>

    </div>
  )
}

export default ArtistCard