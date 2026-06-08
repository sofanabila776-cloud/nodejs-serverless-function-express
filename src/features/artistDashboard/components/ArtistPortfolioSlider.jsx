import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

function ArtistPortfolioSlider({
  pages = [],
  currentIndex = 0,
  setCurrentIndex = () => {},
  className = "",
}) {
  const hasPages = pages.length > 0
  const currentPage = hasPages ? pages[currentIndex] : null
  const isFirstPage = currentIndex === 0
  const isLastPage = currentIndex === pages.length - 1

  const goPrev = () => {
    if (!hasPages || isFirstPage) return
    setCurrentIndex((prev) => prev - 1)
  }

  const goNext = () => {
    if (!hasPages || isLastPage) return
    setCurrentIndex((prev) => prev + 1)
  }

  return (
    <div className={`pk-portfolio-slider ${className}`}>
      {currentPage?.imageUrl && (
        <img
          src={currentPage.imageUrl}
          alt={`Halaman portofolio ${currentPage.pageNumber}`}
          className="w-full h-full object-contain"
        />
      )}

      {!isFirstPage && (
        <button
          type="button"
          onClick={goPrev}
          className="pk-carousel-btn"
          style={{ left: 12 }}
        >
          <FiChevronLeft />
        </button>
      )}

      {!isLastPage && (
        <button
          type="button"
          onClick={goNext}
          className="pk-carousel-btn"
          style={{ right: 12 }}
        >
          <FiChevronRight />
        </button>
      )}

      {hasPages && (
        <div className="absolute right-4 bottom-3 bg-white/90 px-3 py-1 rounded-full text-[14px] font-bold text-[#333333] shadow-sm">
          {currentIndex + 1} / {pages.length}
        </div>
      )}
    </div>
  )
}

export default ArtistPortfolioSlider
