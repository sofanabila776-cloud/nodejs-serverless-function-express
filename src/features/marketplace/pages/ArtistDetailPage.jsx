// Halaman detail artist/potofolio yang diclick dari HomePage

import {
  FiStar,
  FiClock,
  FiHeart,
} from "react-icons/fi"

import {
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5"

const LEVEL_LABELS = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  professional: "Professional",
}

function ArtistDetailPage({
  selectedArtist,
  portfolioIndex,
  setPortfolioIndex,
  isLoggedIn,
  setIsLoggedIn,
  setCurrentPage,
  showLoginWarning,
  setShowLoginWarning,
  similarArtists,
  openDetail,
}) {
if (!selectedArtist) {
  return (
    <div className="pt-[140px] text-center text-red-500">
      Loading artist...
    </div>
  )
}

const portfolioImages =
  selectedArtist?.portfolioPages?.map((page) => page.imageUrl).filter(Boolean) ||
  selectedArtist?.portfolio?.filter((item) => typeof item === "string") ||
  []

const currentPortfolioImage = portfolioImages[portfolioIndex] || ""
const isFirstPortfolio = portfolioIndex === 0
const isLastPortfolio = portfolioIndex === portfolioImages.length - 1

  return (
    <div className="px-[40px] pt-[140px] pb-[60px]">

      <div className="flex gap-[20px]">

        {/* PORTFOLIO */}
<div className="relative w-[720px] h-[420px] border-[3px] border-black rounded-[28px] overflow-hidden bg-white">
  {currentPortfolioImage && (
    <img
      src={currentPortfolioImage}
      alt={`Portofolio ${selectedArtist.name}`}
      className="w-full h-full object-contain"
    />
  )}

  {portfolioImages.length > 1 && !isFirstPortfolio && (
    <button
      onClick={() => setPortfolioIndex(portfolioIndex - 1)}
      className="absolute left-4 top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-[#E5E5E5] flex items-center justify-center"
    >
      <IoChevronBack className="text-[24px]" />
    </button>
  )}

  {portfolioImages.length > 1 && !isLastPortfolio && (
    <button
      onClick={() => setPortfolioIndex(portfolioIndex + 1)}
      className="absolute right-4 top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-[#E5E5E5] flex items-center justify-center"
    >
      <IoChevronForward className="text-[24px]" />
    </button>
  )}
</div>

        {/* INFO */}

        <div className="flex-1">

          <p className="text-[32px]">
            {selectedArtist.name}
          </p>

          <p className="text-[20px] text-[#666666] mt-1">
            Level: {LEVEL_LABELS[selectedArtist.level] || selectedArtist.level || "-"}
          </p>

          <div className="flex gap-4 underline text-[20px] mt-2">

            {
              selectedArtist.tags.map((tag) => (
                <span key={tag}>
                  #{tag.toLowerCase()}
                </span>
              ))
            }

          </div>

          <div className="flex items-center gap-2 mt-3">

            <FiStar className="text-[24px]" />

            <p className="text-[20px]">
              {selectedArtist.rating} (14 ulasan)
            </p>

          </div>

          <div className="flex items-center gap-2 mt-2">

            <FiClock className="text-[24px]" />

            <p className="text-[20px]">
              {selectedArtist.duration}
            </p>

          </div>

          <div className="flex items-center mt-5 gap-3">

            <button
              onClick={() => {

                if (!isLoggedIn) {
                  setShowLoginWarning(true)
                  return
                }

                setCurrentPage("brief")
              }}
              className="flex-1 h-[56px] border-[3px] border-black rounded-[18px] text-[20px]"
            >
              BUAT PESANAN
            </button>

            <button className="w-[56px] h-[56px] border-[3px] border-black rounded-[18px] flex items-center justify-center">

              <FiHeart className="text-[24px]" />

            </button>

          </div>

          {
            showLoginWarning && !isLoggedIn && (
              <p className="text-red-500 text-[16px] mt-3">

                <button
  onClick={() => {
    setShowLoginWarning(false)
    setCurrentPage("login")
  }}
  className="underline"
>
  Login
</button>

                {" "}terlebih dahulu untuk membuat pesanan

              </p>
            )
          }

        </div>

      </div>

      {/* SIMILAR */}

<p className="text-[32px] mt-12">
  Artist serupa
</p>

<div className="grid grid-cols-2 gap-[90px] mt-6">

  {
    similarArtists.slice(0, 2).map((artist) => (
      <div
        key={artist.id}
        onClick={() => openDetail(artist)}
        className="cursor-pointer w-full"
      >

        <div className="w-full h-[250px] border-[3px] border-black rounded-[18px]" />

        <div className="flex justify-between items-start px-4 mt-3">

          <div className="min-w-0">

            <p className="text-[20px]">
              {artist.name}
            </p>

            <div className="flex gap-3 underline text-[20px] flex-wrap">

              {
                artist.tags.map((tag) => (
                  <span key={tag}>
                    #{tag.toLowerCase()}
                  </span>
                ))
              }

            </div>

          </div>

          <div className="flex items-center gap-2 shrink-0 mt-2">

            <FiStar className="text-[22px]" />

            <p className="text-[20px]">
              {artist.rating}
            </p>

          </div>

        </div>

      </div>
    ))
  }

</div>

    </div>
  )
}

export default ArtistDetailPage