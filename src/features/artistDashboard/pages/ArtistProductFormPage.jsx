import { useState } from "react"
import { FiArrowLeft } from "react-icons/fi"
import ArtistPortfolioSlider from "../components/ArtistPortfolioSlider"

const PRODUCT_TAGS = [
  "Poster",
  "Presentation",
  "Animation",
  "Illustration",
  "Brushes & Tool Presets",
  "Texture & Pattern Packs",
  "Fonts & Typography",
  "Pixel Art",
  "3D Design/Product",
  "Stickers",
  "Emote Sticker",
]

function ArtistProductFormPage({
  portfolio = null,
  onAddProduct = () => {},
  setCurrentPage = () => {},
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedPageIndex, setSelectedPageIndex] = useState(null)
  const [selectedTag, setSelectedTag] = useState("")
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const pages = portfolio?.pages || []
  const selectedPage =
    selectedPageIndex !== null ? pages[selectedPageIndex] : null

  const handleNumberChange = (value, setter) => {
    const onlyNumber = value.replace(/\D/g, "")
    setter(onlyNumber)
  }

  const handleBack = () => {
    setCurrentPage("profile")
  }

  const handleSetPage = () => {
    if (pages.length === 0) {
      setErrorMessage("Portofolio belum memiliki halaman.")
      return
    }

    setSelectedPageIndex(currentIndex)
    setErrorMessage("")
  }

  const handleSubmit = () => {
    const minPrice = Number(priceMin)
    const maxPrice = Number(priceMax)

    if (!selectedPage) {
      setErrorMessage("Pilih halaman produk terlebih dahulu.")
      return
    }

    if (!selectedTag) {
      setErrorMessage("Pilih tag produk terlebih dahulu.")
      return
    }

    if (!priceMin || !priceMax) {
      setErrorMessage("Isi harga minimum dan maksimum terlebih dahulu.")
      return
    }

    if (minPrice < 1 || maxPrice < 1) {
      setErrorMessage("Harga minimal harus lebih dari 0.")
      return
    }

    if (minPrice > maxPrice) {
      setErrorMessage("Harga minimum tidak boleh lebih besar dari harga maksimum.")
      return
    }

    const newProduct = {
      id: `product-${Date.now()}`,
      tag: selectedTag,
      priceMin,
      priceMax,
      price: `Rp${Number(priceMin).toLocaleString("id-ID")} - Rp${Number(priceMax).toLocaleString("id-ID")}`,
      coverPortfolioPageId: selectedPage.id,
      coverPortfolioPageNumber: selectedPage.pageNumber,
      coverImageUrl: selectedPage.imageUrl,
    }

    onAddProduct(newProduct)
  }

  if (!portfolio || pages.length === 0) {
    return (
      <div className="pk-page">
        <button
          onClick={handleBack}
          className="pk-btn pk-btn-ghost"
        >
          <FiArrowLeft />
          Kembali
        </button>

        <div className="mt-20 text-center text-[20px]">
          Upload portofolio terlebih dahulu sebelum menambahkan produk.
        </div>
      </div>
    )
  }

  return (
    <div className="pk-page">
      <button
        onClick={handleBack}
        className="pk-btn pk-btn-ghost"
      >
        <FiArrowLeft />
        Kembali
      </button>

      <h1 className="pk-page-title text-center mt-4">Produk</h1>

      <div className="pk-product-form-grid">
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[20px]">Halaman produk</p>

            {selectedPage && (
              <p className="text-[20px] text-[#A4A1A1]">
                Halaman {selectedPage.pageNumber}
              </p>
            )}
          </div>

          <ArtistPortfolioSlider
            pages={pages}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />

          <div className="flex justify-center mt-4">
            <button
              onClick={handleSetPage}
              className="pk-btn pk-btn-primary"
            >
              Set Halaman ini
            </button>
          </div>
        </div>

        <div>
          <p className="text-[20px] mb-3">Tag produk</p>

          {!selectedTag ? (
            <div className="pk-choice-card">
              <p className="text-[20px] text-center mb-5">Pilih satu</p>

              <div className="grid grid-cols-2 gap-4">
                {PRODUCT_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className="pk-choice-btn"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                className="pk-choice-btn px-6"
              >
                {selectedTag}
              </button>

              <button
                onClick={() => setSelectedTag("")}
                className="text-[18px] underline"
              >
                Ganti
              </button>
            </div>
          )}

          <div className="mt-8">
            <p className="text-[20px]">Harga</p>

            <div className="flex items-center gap-4 mt-4">
              <span className="text-[20px]">Rp</span>

              <input
                value={priceMin}
                onChange={(event) =>
                  handleNumberChange(event.target.value, setPriceMin)
                }
                inputMode="numeric"
                placeholder="0"
                className="pk-input text-center" style={{ width: 96 }}
              />

              <span className="text-[20px]">-</span>

              <input
                value={priceMax}
                onChange={(event) =>
                  handleNumberChange(event.target.value, setPriceMax)
                }
                inputMode="numeric"
                placeholder="0"
                className="pk-input text-center" style={{ width: 96 }}
              />
            </div>
          </div>

          {errorMessage && (
            <p className="text-[#FD0707] text-[16px] mt-5">
              {errorMessage}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-[45px]">
        <button
          onClick={handleSubmit}
          className="pk-btn pk-btn-primary" style={{ minWidth: 180 }}
        >
          Tambahkan
        </button>
      </div>
    </div>
  )
}

export default ArtistProductFormPage