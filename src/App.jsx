import { useState, useEffect } from "react"

import {
  FiSearch,
  FiBell,
  FiHeart,
  FiUser,
  FiStar,
  FiClock,
  FiTrash2,
  FiEdit2,
  FiAlertCircle,
} from "react-icons/fi"

import {
  HiOutlineAdjustmentsHorizontal,
} from "react-icons/hi2"

import {
  IoChevronBack,
  IoChevronForward,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5"

import {
  LuClipboardList,
} from "react-icons/lu"

import { FiMessageCircle } from "react-icons/fi"

function App() {

  // =========================
  // LOGIN
  // =========================

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // =========================
  // PAGE
  // =========================

  const [currentPage, setCurrentPage] = useState("home")

  // =========================
  // TOAST
  // =========================

  const [toastMessage, setToastMessage] = useState("")

  const showToast = (message) => {
    setToastMessage(message)

    setTimeout(() => {
      setToastMessage("")
    }, 5000)
  }

  // =========================
  // FILTER
  // =========================

  const [showFilter, setShowFilter] = useState(false)

  const [selectedCategories, setSelectedCategories] = useState([])

  const categories = [
    "Poster",
    "Ppt",
    "Animation",
    "Ilustrasi",
  ]

  // =========================
  // ARTIST DATA
  // =========================

  const artists = [
    {
      id: 1,
      name: "azazarine",
      rating: 4.8,
      duration: "2-4 hari",
      tags: ["Poster", "Ppt", "Animation"],
      portfolio: [1, 2, 3],
      products: [
        {
          tag: "#poster",
          price: "Rp25.000 - Rp35.000",
        },
        {
          tag: "#ppt",
          price: "Rp45.000 - Rp75.000",
        },
        {
          tag: "#animation",
          price: "Rp90.000 - Rp120.000",
        },
      ],
    },

    {
      id: 2,
      name: "artist2",
      rating: 4.7,
      duration: "3-5 hari",
      tags: ["Ilustrasi", "Poster"],
      portfolio: [1, 2],
      products: [
        {
          tag: "#ilustrasi",
          price: "Rp50.000 - Rp80.000",
        },
        {
          tag: "#poster",
          price: "Rp20.000 - Rp40.000",
        },
      ],
    },

    {
      id: 3,
      name: "artist3",
      rating: 4.9,
      duration: "1-2 hari",
      tags: ["Animation", "Ppt"],
      portfolio: [1, 2, 3],
      products: [
        {
          tag: "#animation",
          price: "Rp120.000 - Rp180.000",
        },
        {
          tag: "#ppt",
          price: "Rp55.000 - Rp95.000",
        },
      ],
    },
  ]

  // =========================
  // DETAIL PAGE
  // =========================

  const [selectedArtist, setSelectedArtist] = useState(null)

  const [portfolioIndex, setPortfolioIndex] = useState(0)

  // =========================
  // BRIEF
  // =========================

  const [showDropdown, setShowDropdown] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState(null)

  const [quantity, setQuantity] = useState("")

  const [description, setDescription] = useState("")

  const [showError, setShowError] = useState(false)

  // =========================
  // ORDERS
  // =========================

  const [orders, setOrders] = useState([])

  // =========================
  // PROFILE
  // =========================

  const [activeSidebar, setActiveSidebar] = useState("account")

  const [activeOrderStatus, setActiveOrderStatus] = useState("waiting")

  const [phone, setPhone] = useState("")

  const [gender, setGender] = useState("")

  const [showDeletePopup, setShowDeletePopup] = useState(false)

  // =========================
  // FILTER FUNCTION
  // =========================

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      )
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const removeCategory = (category) => {
    setSelectedCategories(
      selectedCategories.filter((item) => item !== category)
    )
  }

  // =========================
  // FILTERED ARTIST
  // =========================

  const filteredArtists =
    selectedCategories.length === 0
      ? artists
      : artists
          .filter((artist) =>
            artist.tags.some((tag) =>
              selectedCategories.includes(tag)
            )
          )
          .sort((a, b) => {
            const aCount = a.tags.filter((tag) =>
              selectedCategories.includes(tag)
            ).length

            const bCount = b.tags.filter((tag) =>
              selectedCategories.includes(tag)
            ).length

            return bCount - aCount
          })

  // =========================
  // OPEN DETAIL
  // =========================

  const openDetail = (artist) => {
    setSelectedArtist(artist)
    setPortfolioIndex(0)
    setCurrentPage("detail")
  }

  // =========================
  // SIMILAR ARTIST
  // =========================

  const similarArtists = artists.filter(
    (artist) => artist.id !== selectedArtist?.id
  )

  // =========================
  // SUBMIT BRIEF
  // =========================

  const handleSubmitBrief = () => {

    if (
      !selectedProduct ||
      !quantity ||
      !description
    ) {
      setShowError(true)
      return
    }

    const newOrder = {
      id: Date.now(),
      artist: selectedArtist.name,
      product: selectedProduct.tag,
      price: selectedProduct.price,
      quantity,
      description,
      status: "waiting",
    }

    setOrders([newOrder, ...orders])

    setCurrentPage("home")

    showToast("Brief pesanan berhasil diajukan")

    setSelectedProduct(null)
    setQuantity("")
    setDescription("")
    setShowError(false)
  }

  // =========================
  // CANCEL ORDER
  // =========================

  const cancelOrder = (id) => {
    setOrders(
      orders.filter((order) => order.id !== id)
    )
  }

  // =========================
  // HEADER
  // =========================

  const Header = () => (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-[40px] py-[20px] flex items-center justify-between">

      <button
        onClick={() => setCurrentPage("home")}
        className="text-[36px]"
      >
        PICKARYA
      </button>

      {
        currentPage === "home" && (
          <div className="absolute left-1/2 -translate-x-1/2 w-[420px] h-[60px] border-[3px] border-black rounded-full flex items-center px-5 gap-4">

            <input
              type="text"
              placeholder="Cari karya atau artist"
              className="w-full outline-none text-[20px]"
            />

            <FiSearch className="text-[28px]" />

          </div>
        )
      }

      {
        !isLoggedIn ? (
          <button
            onClick={() => setIsLoggedIn(true)}
            className="text-[20px]"
          >
            LOG IN
          </button>
        ) : (
          <div className="flex items-center gap-5">

            <FiBell className="text-[24px]" />

            <FiHeart className="text-[24px]" />

            <button
              onClick={() => {
                setCurrentPage("profile")
                setActiveSidebar("account")
              }}
            >
              <FiUser className="text-[24px]" />
            </button>

          </div>
        )
      }

    </div>
  )

  // =========================
  // HOME PAGE
  // =========================

  if (currentPage === "home") {

    return (
      <div className="min-h-screen bg-[#F5F5F5]">

        <Header />

        {/* TOAST */}

        {
          toastMessage && (
            <div className="fixed top-[100px] left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-[14px] z-[100] text-[20px]">
              {toastMessage}
            </div>
          )
        }

        <div className="px-[40px] pt-[130px] pb-[60px]">

          {/* FILTER */}

          <div className="flex justify-end relative">

            <button
              onClick={() => setShowFilter(!showFilter)}
            >
              <HiOutlineAdjustmentsHorizontal className="text-[38px]" />
            </button>

            {
              showFilter && (
                <>
                  <div
                    onClick={() => setShowFilter(false)}
                    className="fixed inset-0 z-10"
                  />

                  <div className="absolute top-[60px] right-0 bg-[#F5F5F5] border shadow-lg rounded-[24px] w-[460px] p-8 z-20">

                    <p className="text-[24px] text-center mb-6">
                      Pilih satu atau lebih
                    </p>

                    <div className="flex flex-wrap gap-4">

                      {
                        categories.map((category) => {

                          const selected =
                            selectedCategories.includes(category)

                          return (
                            <button
                              key={category}
                              onClick={() => toggleCategory(category)}
                              className={`h-[52px] px-5 rounded-full border-[2px] text-[20px] flex items-center gap-2
                                
                                ${
                                  selected
                                    ? "bg-white border-yellow-500 text-yellow-500"
                                    : "bg-white border-black text-black"
                                }
                              `}
                            >

                              <span>{category}</span>

                              {
                                selected && (
                                  <span>×</span>
                                )
                              }

                            </button>
                          )
                        })
                      }

                    </div>

                    <div className="flex justify-center mt-8">

                      <button
                        onClick={() => setShowFilter(false)}
                        className="bg-black text-white text-[20px] px-8 h-[50px] rounded-[12px]"
                      >
                        Terapkan
                      </button>

                    </div>

                  </div>
                </>
              )
            }

          </div>

          {/* SELECTED CATEGORY */}

          {
            selectedCategories.length > 0 && (
              <div className="flex gap-4 mt-6 flex-wrap">

                {
                  selectedCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => removeCategory(category)}
                      className="h-[50px] px-5 rounded-full border-[2px] border-yellow-500 bg-white text-yellow-500 text-[20px] flex items-center gap-2"
                    >
                      <span>{category}</span>
                      <span>×</span>
                    </button>
                  ))
                }

              </div>
            )
          }

          {/* CARDS */}

          <div className="flex gap-[32px] flex-wrap mt-8">

            {
              filteredArtists.map((artist) => (
                <div
                  key={artist.id}
                  onClick={() => openDetail(artist)}
                  className="cursor-pointer"
                >

                  <div className="w-[570px] h-[280px] border-[3px] border-black rounded-[28px]" />

                  <div className="flex justify-between px-4 mt-3">

                    <div>

                      <p className="text-[20px]">
                        {artist.name}
                      </p>

                      <div className="flex gap-4 text-[20px] underline">

                        {
                          artist.tags.map((tag) => {

                            const highlighted =
                              selectedCategories.includes(tag)

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
              ))
            }

          </div>

        </div>

      </div>
    )
  }

  // =========================
  // DETAIL PAGE
  // =========================

  if (currentPage === "detail") {

    return (
      <div className="min-h-screen bg-[#F5F5F5]">

        <Header />

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
                  onClick={() => setCurrentPage("brief")}
                  className="flex-1 h-[56px] border-[3px] border-black rounded-[18px] text-[20px]"
                >
                  BUAT PESANAN
                </button>

                <button className="w-[56px] h-[56px] border-[3px] border-black rounded-[18px] flex items-center justify-center">
                  <FiHeart className="text-[24px]" />
                </button>

              </div>

            </div>

          </div>

          {/* SIMILAR */}

          <p className="text-[24px] mt-10">
            Artist serupa
          </p>

          <div className="flex gap-[32px] mt-5">

            {
              similarArtists.map((artist) => (
                <div
                  key={artist.id}
                  onClick={() => openDetail(artist)}
                  className="cursor-pointer"
                >

                  <div className="w-[500px] h-[240px] border-[3px] border-black rounded-[24px]" />

                  <div className="flex justify-between px-4 mt-3">

                    <div>

                      <p className="text-[20px]">
                        {artist.name}
                      </p>

                      <div className="flex gap-3 underline text-[20px]">
                        {
                          artist.tags.map((tag) => (
                            <span key={tag}>
                              #{tag.toLowerCase()}
                            </span>
                          ))
                        }
                      </div>

                    </div>

                    <div className="flex items-center gap-2">

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

      </div>
    )
  }

  // =========================
  // BRIEF PAGE
  // =========================

  if (currentPage === "brief") {

    return (
      <div className="min-h-screen bg-[#F5F5F5]">

        <Header />

        <div className="px-[70px] pt-[140px]">

          <p className="text-[32px] text-center">
            Brief Pesanan
          </p>

          <div className="flex items-center gap-3 mt-10">

            <p className="text-[24px]">
              {selectedArtist.name}
            </p>

            <FiStar className="text-[24px]" />

            <p className="text-[24px]">
              {selectedArtist.rating} (14 ulasan)
            </p>

          </div>

          {/* PRODUCT */}

          <div className="flex gap-4 mt-6">

            <div className="flex-1 relative">

              <p className="text-[20px] mb-2">
                Produk
              </p>

              <button
                onClick={() =>
                  setShowDropdown(!showDropdown)
                }
                className="w-full h-[60px] border-[3px] border-black rounded-[18px] px-5 flex items-center justify-between text-[20px]"
              >

                {
                  selectedProduct
                    ? `${selectedProduct.tag}  ${selectedProduct.price}`
                    : "Pilih produk"
                }

                {
                  showDropdown ? (
                    <IoChevronUp className="text-[24px]" />
                  ) : (
                    <IoChevronDown className="text-[24px]" />
                  )
                }

              </button>

              {
                showDropdown && (
                  <div className="absolute top-[90px] left-0 w-full bg-[#F5F5F5] border shadow-lg rounded-[18px] p-5 max-h-[300px] overflow-y-auto z-30">

                    <div className="flex flex-col gap-4">

                      {
                        selectedArtist.products.map((product) => (
                          <button
                            key={product.tag}
                            onClick={() => {
                              setSelectedProduct(product)
                              setShowDropdown(false)
                            }}
                            className="flex gap-4 items-center text-left"
                          >

                            <div className="w-[85px] h-[55px] border-[3px] border-black rounded-[14px]" />

                            <div>

                              <p className="text-[20px]">
                                {product.tag}
                              </p>

                              <p className="text-[20px]">
                                {product.price}
                              </p>

                            </div>

                          </button>
                        ))
                      }

                    </div>

                  </div>
                )
              }

            </div>

            {/* JUMLAH */}

            <div className="w-[120px]">

              <p className="text-[20px] mb-2">
                Jumlah
              </p>

              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value)
                }
                className="w-full h-[60px] border-[3px] border-black rounded-[18px] px-4 text-[20px] outline-none"
              />

            </div>

          </div>

          {/* DESKRIPSI */}

          <div className="mt-8">

            <p className="text-[20px] mb-2">
              Deskripsi Request
            </p>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Masukkan deskripsi request"
              className="w-full h-[180px] border-[3px] border-black rounded-[18px] p-5 text-[20px] outline-none resize-none placeholder:text-[#8E8E8E]"
            />

          </div>

          {
            showError && (
              <div className="flex items-center gap-2 mt-3 text-red-500">

                <FiAlertCircle className="text-[22px]" />

                <p className="text-[20px]">
                  Lengkapi brief pesananmu
                </p>

              </div>
            )
          }

          {/* BUTTON */}

          <div className="flex justify-center gap-5 mt-10 pb-[50px]">

            <button
              onClick={() => setCurrentPage("home")}
              className="w-[150px] h-[50px] bg-black text-white rounded-[12px] text-[20px]"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmitBrief}
              className="w-[150px] h-[50px] bg-black text-white rounded-[12px] text-[20px]"
            >
              Kirim
            </button>

          </div>

        </div>

      </div>
    )
  }

  // =========================
  // PROFILE PAGE
  // =========================

  if (currentPage === "profile") {

    return (
      <div className="min-h-screen bg-[#F5F5F5]">

        <Header />

        {/* DELETE POPUP */}

        {
          showDeletePopup && (
            <>
              <div className="fixed inset-0 bg-black/40 z-40" />

              <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F5F5F5] rounded-[18px] p-8 z-50 shadow-lg">

                <p className="text-[20px] text-center">
                  Apakah anda yakin ingin
                  menghapus akun ini?
                </p>

                <div className="flex justify-center gap-4 mt-6">

                  <button
                    onClick={() =>
                      setShowDeletePopup(false)
                    }
                    className="w-[100px] h-[42px] border border-black rounded-[10px] text-[20px]"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      setIsLoggedIn(false)
                      setCurrentPage("home")
                    }}
                    className="w-[100px] h-[42px] bg-black text-white rounded-[10px] text-[20px]"
                  >
                    Hapus
                  </button>

                </div>

              </div>
            </>
          )
        }

        {/* TOAST */}

        {
          toastMessage && (
            <div className="fixed top-[100px] left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-[14px] z-[100] text-[20px]">
              {toastMessage}
            </div>
          )
        }

        <div className="flex px-[40px] pt-[140px] gap-[40px]">

          {/* SIDEBAR */}

          <div className="w-[240px]">

            <button
              onClick={() =>
                setActiveSidebar("account")
              }
              className="flex items-center gap-3 text-[24px]"
            >

              <FiUser />

              <span
                className={
                  activeSidebar === "account"
                    ? "text-yellow-500"
                    : ""
                }
              >
                Akun
              </span>

            </button>

            <button
              onClick={() =>
                setActiveSidebar("orders")
              }
              className="flex items-start gap-3 text-[24px] mt-5"
            >

              <LuClipboardList className="min-w-[24px] min-h-[24px] mt-1" />

              <div className="text-left">

                <p>
                  Riwayat
                  <br />
                  Pesanan
                </p>

                {
                  activeSidebar === "orders" && (
                    <div className="mt-4 space-y-3 text-[20px]">

                      <p className="text-yellow-500">
                        Menunggu persetujuan
                      </p>

                      <p>Belum dibayar</p>

                      <p>Diproses</p>

                      <p>Revisi</p>

                      <p>Selesai</p>

                      <p>Dibatalkan</p>

                    </div>
                  )
                }

              </div>

            </button>

            <button className="flex items-center gap-3 text-[24px] mt-5">

              <FiMessageCircle />

              <span>
                Riwayat Ulasan
              </span>

            </button>

          </div>

          {/* CONTENT */}

          <div className="flex-1 border-[3px] border-[#D9D9D9] p-8">

            {
              activeSidebar === "account" && (
                <>
                  <div className="flex justify-between items-center">

                    <p className="text-[28px]">
                      Profil Akun
                    </p>

                    <button
                      onClick={() =>
                        setShowDeletePopup(true)
                      }
                    >
                      <FiTrash2 className="text-[24px]" />
                    </button>

                  </div>

                  <div className="flex gap-[40px] mt-10">

                    {/* PROFILE */}

                    <div className="flex flex-col items-center">

                      <div className="relative w-[140px] h-[140px] rounded-full bg-[#D9D9D9]">

                        <button className="absolute bottom-0 right-0 w-[38px] h-[38px] rounded-full bg-black flex items-center justify-center">

                          <FiEdit2 className="text-white text-[18px]" />

                        </button>

                      </div>

                      <p className="text-[24px] mt-4">
                        unainaina
                      </p>

                    </div>

                    {/* FORM */}

                    <div className="flex-1">

                      <p className="text-[20px]">
                        Email
                      </p>

                      <input
                        value="u****a@gmail.com"
                        readOnly
                        className="w-full h-[56px] border-[3px] border-black rounded-[14px] px-4 text-[20px] outline-none mt-2"
                      />

                      <p className="text-[20px] mt-5">
                        Nomor Telepon
                      </p>

                      <input
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value)
                        }
                        placeholder="Masukkan nomor telepon"
                        className="w-full h-[56px] border-[3px] border-black rounded-[14px] px-4 text-[20px] outline-none mt-2 placeholder:text-[#8E8E8E]"
                      />

                      <p className="text-[20px] mt-5">
                        Jenis Kelamin
                      </p>

                      <div className="flex gap-8 mt-3 text-[20px]">

                        {
                          [
                            "Perempuan",
                            "Laki-laki",
                            "Rahasia",
                          ].map((item) => (
                            <label
                              key={item}
                              className="flex items-center gap-2"
                            >

                              <input
                                type="radio"
                                checked={gender === item}
                                onChange={() =>
                                  setGender(item)
                                }
                              />

                              {item}

                            </label>
                          ))
                        }

                      </div>

                      <div className="flex justify-end mt-8">

                        <button
                          onClick={() =>
                            showToast(
                              "Profil berhasil disimpan"
                            )
                          }
                          className="w-[140px] h-[50px] bg-black text-white rounded-[12px] text-[20px]"
                        >
                          Simpan
                        </button>

                      </div>

                    </div>

                  </div>
                </>
              )
            }

            {
              activeSidebar === "orders" && (
                <div className="space-y-5">

                  {
                    orders.length === 0 ? (
                      <div className="border-[3px] border-[#D9D9D9] h-[160px] flex items-center justify-center text-[20px]">

                        Tidak ada pesanan yang menunggu persetujuan

                      </div>
                    ) : (
orders.map((order) => (
  <div
    key={order.id}
    className="border-[3px] border-[#D9D9D9] p-5 rounded-[18px]"
  >

    {/* STATUS */}

    <div className="flex justify-end">

      <p className="text-[16px] text-yellow-500">
        Menunggu persetujuan
      </p>

    </div>

    {/* CONTENT */}

    <div className="flex gap-5 mt-2">

      {/* IMAGE */}

      <div className="w-[293px] h-[133px] border-[3px] border-black rounded-[18px] flex-shrink-0" />

      {/* INFO */}

      <div className="flex flex-col justify-center min-w-0">

        {/* ARTIST */}

        <p className="text-[20px]">
          {order.artist}
        </p>

        {/* PRODUCT */}

        <p className="text-[20px] mt-1">
          {order.product}
          &nbsp; x{order.quantity || 1}
          &nbsp; {order.price}
        </p>

        {/* DESCRIPTION */}

        <p className="text-[16px] text-[#555555] truncate mt-1 max-w-[520px]">
          {order.description}
        </p>

      </div>

    </div>

    {/* BUTTON */}

    <div className="flex justify-end mt-5">

      <button
        onClick={() => cancelOrder(order.id)}
        className="w-[130px] h-[46px] bg-black text-white rounded-[12px] text-[20px]"
      >
        Batalkan
      </button>

    </div>

  </div>
))
                    )
                  }

                </div>
              )
            }

          </div>

        </div>

      </div>
    )
  }
}

export default App