import {
  FiStar,
  FiClock,
  FiHeart,
} from "react-icons/fi"

import {
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5"

function DetailPage({
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

  return (
    <div className="px-[40px] pt-[140px] pb-[60px]">

      <div className="flex gap-[20px]">

        {/* PORTFOLIO */}

        <div className="relative w-[720px] h-[420px] border-[3px] border-black rounded-[28px]">

          <button
            onClick={() =>
              setPortfolioIndex(
                portfolioIndex === 0
                  ? selectedArtist.portfolio.length - 1
                  : portfolioIndex - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-[#E5E5E5] flex items-center justify-center"
          >
            <IoChevronBack className="text-[24px]" />
          </button>

          <button
            onClick={() =>
              setPortfolioIndex(
                portfolioIndex ===
                  selectedArtist.portfolio.length - 1
                  ? 0
                  : portfolioIndex + 1
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-[#E5E5E5] flex items-center justify-center"
          >
            <IoChevronForward className="text-[24px]" />
          </button>

        </div>

        {/* INFO */}

        <div className="flex-1">

          <p className="text-[32px]">
            {selectedArtist.name}
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
                    setIsLoggedIn(true)
                    setShowLoginWarning(false)
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

export default DetailPage