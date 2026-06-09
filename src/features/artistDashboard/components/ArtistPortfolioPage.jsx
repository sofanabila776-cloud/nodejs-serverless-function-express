import { useState } from "react"
import { FiClock, FiTrash2, FiX } from "react-icons/fi"
import ArtistPortfolioSlider from "./ArtistPortfolioSlider"

function ArtistPortfolioPage({
  portfolio = null,
  onUploadClick = () => {},
  onDeleteClick = () => {},
  onDeleteProduct = () => {},
  onPublishClick = () => {},
  onAddProductClick = () => {},
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showDeletePopup, setShowDeletePopup] = useState(false)

  const pages = portfolio?.pages || []
  const products = portfolio?.products || []
  const hasPortfolio = pages.length > 0
  const canPublish = hasPortfolio && products.length > 0

  if (!hasPortfolio) {
    return (
      <>
        <div className="pk-dashboard-heading">
          <span className="pk-section-title">Portofolio Artist</span>
        </div>

        <div className="pk-empty-mini" style={{ minHeight: 260, flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 42 }}>🎨</div>
          <p>
            Yah, belum ada Portofolio nih.. 😔🥀
            <br />
            Yuk upload portofolio untuk menarik pelanggan!
          </p>
        </div>

        <div className="flex justify-end mt-8">
          <button onClick={onUploadClick} className="pk-btn pk-btn-primary" style={{ minWidth: 140 }}>
            Upload
          </button>
        </div>
      </>
    )
  }

  const durationText =
    portfolio.durationMin && portfolio.durationMax
      ? `${portfolio.durationMin}-${portfolio.durationMax} hari`
      : "-"

  return (
    <>
      {showDeletePopup && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" />

          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[24px] p-8 z-50 shadow-lg border border-black/10 max-w-[420px] w-[90%]">
            <p className="text-[18px] text-center font-semibold text-[#333333]">
              Apakah Anda yakin ingin menghapus portofolio ini beserta produknya?
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="pk-btn pk-btn-ghost"
                style={{ minWidth: 100 }}
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowDeletePopup(false)
                  onDeleteClick()
                }}
                className="pk-btn pk-btn-danger"
                style={{ minWidth: 100 }}
              >
                Hapus
              </button>
            </div>
          </div>
        </>
      )}

      <div className="pk-dashboard-heading">
        <span className="pk-section-title">Portofolio Artist</span>

        <button
          onClick={() => setShowDeletePopup(true)}
          className="pk-icon-btn"
          aria-label="Hapus portofolio"
          title="Hapus portofolio"
        >
          <FiTrash2 className="text-[20px]" />
        </button>
      </div>

      <div className="flex gap-[24px] mt-8 flex-wrap">
        <ArtistPortfolioSlider
          pages={pages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />

        <div className="pt-1 min-w-[220px]">
          <p className="text-[24px] font-black tracking-[-0.04em] text-[#333333]">{portfolio.title || "Portoku 1"}</p>

          <div className="flex items-center gap-2 mt-2 text-[#777777]">
            <FiClock className="text-[18px]" />
            <span className="text-[17px] font-semibold">{durationText}</span>
          </div>

          {portfolio?.isPublished && (
            <p className="text-[14px] text-green-700 font-bold mt-3 bg-green-50 border border-green-100 rounded-full px-3 py-1 inline-flex">
              Sudah dipublikasikan
            </p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-3">
          <p className="text-[20px] font-black tracking-[-0.03em]">Produk</p>

          <button
            onClick={onAddProductClick}
            className="pk-icon-btn"
            style={{ width: 34, height: 34, fontSize: 24, fontWeight: 900 }}
            aria-label="Tambah produk"
            title="Tambah produk"
          >
            <span style={{ lineHeight: 1, marginTop: -5 }}>
             +
            </span>
          </button>
        </div>

        <div className="pk-product-list-box">
          {products.length === 0 ? (
            <p className="text-[#A4A1A1] text-[18px]">-</p>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product._id || product.id}
                  className="relative flex items-center gap-5 pr-10"
                >
                  <div className="w-[96px] h-[56px] rounded-[16px] border border-black/10 overflow-hidden bg-white shrink-0">
                    {product.coverImageUrl && (
                      <img
                        src={product.coverImageUrl}
                        alt={product.tag}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  <div className="text-[17px] leading-tight text-[#333333]">
                    <p className="font-bold">
                      #
                      {String(product.tag)
                        .replace("#", "")
                        .toLowerCase()}
                    </p>
                    <p className="text-[#3476B2] font-semibold mt-1">
                     {product.price
                        ? product.price
                        : `Rp${Number(product.priceMin).toLocaleString("id-ID")} - Rp${Number(product.priceMax).toLocaleString("id-ID")}`}
                    </p>
                  </div>

                  <button
                    onClick={() => onDeleteProduct(product._id || product.id)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 pk-icon-btn"
                    style={{ width: 30, height: 30 }}
                    aria-label="Hapus produk"
                    title="Hapus produk"
                  >
                    <FiX className="text-[18px]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {products.length === 0 && (
          <p className="text-[#D85D5D] text-[14px] font-semibold mt-2">
            Belum ada produk
          </p>
        )}
      </div>

      <div className="flex flex-col items-end mt-8">
        <button
          onClick={onPublishClick}
          disabled={!canPublish}
          className={canPublish ? "pk-btn pk-btn-primary" : "pk-btn pk-btn-ghost"}
          style={{ minWidth: 180 }}
        >
          {portfolio?.isPublished ? "Update Publikasi" : "Publikasikan"}
        </button>

        {!canPublish && (
          <p className="text-[14px] text-[#777777] mt-2">
            Tambahkan produk dulu sebelum publikasi
          </p>
        )}
      </div>
    </>
  )
}

export default ArtistPortfolioPage
