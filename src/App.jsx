import { useState } from "react"
import Header from "./shared/components/Header"
import Toast from "./shared/components/Toast"

import BuyerHomePage from "./features/marketplace/pages/BuyerHomePage"
import ArtistDetailPage from "./features/marketplace/pages/ArtistDetailPage"
import BriefPage from "./features/marketplace/pages/BriefPage"
import ProfilePage from "./features/profile/pages/ProfilePage"

import { artists } from "./features/marketplace/data/artists"
import { ORDER_STATUS } from "./features/orders/constants/orderStatus"

import {
  createOrder,
  updateOrderById,
  updateSelectedOrderById,
} from "./features/orders/utils/orderHelpers"

import LoginPage from "./features/auth/pages/LoginPage"
import SignupAccountPage from "./features/auth/pages/SignupAccountPage"
import SignupRolePage from "./features/auth/pages/SignupRolePage"
import SignupBuyerUsernamePage from "./features/auth/pages/SignupBuyerUsernamePage"
import SignupArtistLevelPage from "./features/auth/pages/SignupArtistLevelPage"
import SignupArtistUsernamePage from "./features/auth/pages/SignupArtistUsernamePage"

import {
  getCurrentUser,
  logoutUser,
  deleteCurrentUserAccount,
} from "./features/auth/services/authService"

import {
  DEFAULT_BUYER,
  DEFAULT_ARTIST,
  MARKETPLACE_CATEGORIES,
} from "./shared/constants/appDefaults"

import {
  getCurrentBuyerName,
  getCurrentArtistInfo,
} from "./shared/utils/userHelpers"

function App() {
  const handleLoginSuccess = (user) => {
  setCurrentUser(user)
  setIsLoggedIn(true)
  setRole(user.role)

  if (user.role === "artist") {
    setCurrentPage("profile")
    setActiveSidebar("account")
    setActiveOrderStatus("artist_incoming")
  } else {
    setCurrentPage("home")
  }
}

const handleLogout = () => {
  logoutUser()
  setCurrentUser(null)
  setIsLoggedIn(false)
  setRole("buyer")
  setCurrentPage("home")
}

const handleDeleteAccount = async () => {
  try {
    await deleteCurrentUserAccount()

    setCurrentUser(null)
    setIsLoggedIn(false)
    setRole("buyer")
    setShowDeletePopup(false)
    setCurrentPage("home")

    showToast("Akun berhasil dihapus")
  } catch (error) {
    showToast(error.message || "Gagal menghapus akun")
  }
}

  const [currentUser, setCurrentUser] = useState(getCurrentUser())
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(currentUser))
  const [currentPage, setCurrentPage] = useState("home")
  const [role, setRole] = useState(currentUser?.role || "buyer")
  const [signupData, setSignupData] = useState({})

  const [toastMessage, setToastMessage] = useState("")

  const [showFilter, setShowFilter] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])

  const [selectedArtist, setSelectedArtist] = useState(null)
  const [portfolioIndex, setPortfolioIndex] = useState(0)
  const [showLoginWarning, setShowLoginWarning] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setQuantity] = useState("")
  const [description, setDescription] = useState("")
  const [showError, setShowError] = useState(false)

  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)

  const [activeSidebar, setActiveSidebar] = useState("account")
  const [activeOrderStatus, setActiveOrderStatus] = useState("waiting")

  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("")
  const [showDeletePopup, setShowDeletePopup] = useState(false)

  const showToast = (msg, duration = 3000) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(""), duration)
  }

  const categories = MARKETPLACE_CATEGORIES

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat))
    } else {
      setSelectedCategories([...selectedCategories, cat])
    }
  }

  const removeCategory = (cat) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== cat))
  }

  const filteredArtists =
    selectedCategories.length === 0
      ? artists
      : artists.filter((a) =>
          a.tags.some((t) => selectedCategories.includes(t))
        )

  const currentBuyerName = getCurrentBuyerName(currentUser, DEFAULT_BUYER)

  const currentArtist = getCurrentArtistInfo({
    role,
    currentUser,
    artists,
    defaultArtist: DEFAULT_ARTIST,
  })

  const openDetail = (artist) => {
    setSelectedArtist(artist)
    setPortfolioIndex(0)
    setCurrentPage("detail")
  }

  const handleSubmitBrief = () => {
    if (!selectedProduct || !quantity || Number(quantity) < 1 || !description) {
      setShowError(true)
      return
    }

    const newOrder = createOrder({
     selectedArtist,
     selectedProduct,
     quantity,
     description,
     currentBuyerName,
     currentUser,
   })

    setOrders([newOrder, ...orders].filter(Boolean))
    setCurrentPage("home")

    setSelectedProduct(null)
    setQuantity("")
    setDescription("")
    setShowError(false)

    showToast("Pesanan berhasil dibuat")
  }

  const cancelOrder = (id) => {
    const changes = {
      status: ORDER_STATUS.CANCELLED_BY_BUYER,
      cancelledAt: "04-04-2026 11:00",
      cancelReason: "Anda membatalkan pesanan",
    }

    setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))
    setSelectedOrder((prevOrder) =>
      updateSelectedOrderById(prevOrder, id, changes)
    )

    showToast("Pesanan dibatalkan", 5000)
  }

  const rejectOrderByArtist = (id) => {
  const changes = {
    status: ORDER_STATUS.REJECTED_BY_ARTIST,
    rejectedAt: "04-04-2026 10:30",
    cancelledAt: "04-04-2026 10:30",
  }

  setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))
  setSelectedOrder((prevOrder) =>
    updateSelectedOrderById(prevOrder, id, changes)
  )

  showToast("Pesanan ditolak artist", 5000)
}

  const acceptOrderByArtist = (id, totalPrice) => {
  const changes = {
    status: ORDER_STATUS.ACCEPTED,
    totalPrice,
    acceptedAt: "04-04-2026 12:45",
  }

  setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))
  setSelectedOrder((prevOrder) =>
    updateSelectedOrderById(prevOrder, id, changes)
  )

  showToast("Harga berhasil diajukan", 5000)
}

  const confirmPaymentByBuyer = (id) => {
  const changes = {
    status: ORDER_STATUS.BUYER_CONFIRMED_PAYMENT,
    paymentConfirmedAt: "05-04-2026 07:15",
  }

  setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))
  setSelectedOrder((prevOrder) =>
    updateSelectedOrderById(prevOrder, id, changes)
  )

  showToast("Konfirmasi pembayaran berhasil dikirim", 5000)
}

  const confirmPaymentByArtist = (id) => {
  const changes = {
    status: ORDER_STATUS.PAID_CONFIRMED,
    processedAt: "05-04-2026 07:15",
  }

  setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))
  setSelectedOrder((prevOrder) =>
    updateSelectedOrderById(prevOrder, id, changes)
  )

  setCurrentPage("profile")
  setActiveSidebar("orders")
  setActiveOrderStatus("artist_process")
  showToast("Pembayaran berhasil dikonfirmasi", 5000)
}

  const uploadResultByArtist = (id, resultLink) => {
  const changes = {
    status: ORDER_STATUS.RESULT_UPLOADED,
    resultLink,
    resultUploadedAt: "05-04-2026 08:00",
  }

  setOrders((prevOrders) => updateOrderById(prevOrders, id, changes))
  setSelectedOrder((prevOrder) =>
    updateSelectedOrderById(prevOrder, id, changes)
  )

  showToast("Hasil karya berhasil dikirim", 5000)
}

  let page

  switch (currentPage) {
    case "home":
      page = (
        <BuyerHomePage
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          categories={categories}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          removeCategory={removeCategory}
          filteredArtists={filteredArtists}
          openDetail={openDetail}
        />
      )
      break

    case "detail":
      page = (
        <ArtistDetailPage
          selectedArtist={selectedArtist}
          portfolioIndex={portfolioIndex}
          setPortfolioIndex={setPortfolioIndex}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setCurrentPage={setCurrentPage}
          showLoginWarning={showLoginWarning}
          setShowLoginWarning={setShowLoginWarning}
          similarArtists={artists.filter(
            (a) => a.id !== selectedArtist?.id
          )}
          openDetail={openDetail}
        />
      )
      break

    case "brief":
      page = (
        <BriefPage
          selectedArtist={selectedArtist}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          quantity={quantity}
          setQuantity={setQuantity}
          description={description}
          setDescription={setDescription}
          handleSubmitBrief={handleSubmitBrief}
          showError={showError}
          setCurrentPage={setCurrentPage}
        />
      )
      break

    case "profile":
      page = (
        <ProfilePage
          role={role}
          currentArtist={currentArtist}
          currentPage={currentPage}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          activeSidebar={activeSidebar}
          setActiveSidebar={setActiveSidebar}
          activeOrderStatus={activeOrderStatus}
          setActiveOrderStatus={setActiveOrderStatus}
          showDeletePopup={showDeletePopup}
          setShowDeletePopup={setShowDeletePopup}
          setCurrentPage={setCurrentPage}
          onLogout={handleLogout}
          onDeleteAccount={handleDeleteAccount}
          phone={phone}
          setPhone={setPhone}
          gender={gender}
          setGender={setGender}
          showToast={showToast}
          orders={orders}
          cancelOrder={cancelOrder}
          rejectOrderByArtist={rejectOrderByArtist}
          acceptOrderByArtist={acceptOrderByArtist}
          confirmPaymentByBuyer={confirmPaymentByBuyer}
          confirmPaymentByArtist={confirmPaymentByArtist}
          uploadResultByArtist={uploadResultByArtist}
          currentUser={currentUser}
        />
      )
      break

    case "orderDetail":
      page = (
        <ProfilePage
          role={role}
          currentArtist={currentArtist}
          currentPage={currentPage}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          activeSidebar="orders"
          setActiveSidebar={setActiveSidebar}
          activeOrderStatus={activeOrderStatus}
          setActiveOrderStatus={setActiveOrderStatus}
          showDeletePopup={showDeletePopup}
          setShowDeletePopup={setShowDeletePopup}
          setCurrentPage={setCurrentPage}
          onDeleteAccount={handleDeleteAccount}
          phone={phone}
          setPhone={setPhone}
          gender={gender}
          setGender={setGender}
          showToast={showToast}
          orders={orders}
          cancelOrder={cancelOrder}
          rejectOrderByArtist={rejectOrderByArtist}
          acceptOrderByArtist={acceptOrderByArtist}
          confirmPaymentByBuyer={confirmPaymentByBuyer}
          confirmPaymentByArtist={confirmPaymentByArtist}
          uploadResultByArtist={uploadResultByArtist}
          currentUser={currentUser}
        />
      )
      break

    case "login":
  page = (
    <LoginPage
      setCurrentPage={setCurrentPage}
      onLoginSuccess={handleLoginSuccess}
    />
  )
  break

case "signupAccount":
  page = (
    <SignupAccountPage
      setCurrentPage={setCurrentPage}
      signupData={signupData}
      setSignupData={setSignupData}
    />
  )
  break

case "signupRole":
  page = (
    <SignupRolePage
      setCurrentPage={setCurrentPage}
      signupData={signupData}
      setSignupData={setSignupData}
    />
  )
  break

case "signupBuyerUsername":
  page = (
    <SignupBuyerUsernamePage
      setCurrentPage={setCurrentPage}
      signupData={signupData}
      setSignupData={setSignupData}
      onLoginSuccess={handleLoginSuccess}
    />
  )
  break

case "signupArtistLevel":
  page = (
    <SignupArtistLevelPage
      setCurrentPage={setCurrentPage}
      signupData={signupData}
      setSignupData={setSignupData}
    />
  )
  break

case "signupArtistUsername":
  page = (
    <SignupArtistUsernamePage
      setCurrentPage={setCurrentPage}
      signupData={signupData}
      setSignupData={setSignupData}
      onLoginSuccess={handleLoginSuccess}
    />
  )
  break

    default:
      page = <div>Page not found</div>
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        role={role}
        setActiveSidebar={setActiveSidebar}
        setActiveOrderStatus={setActiveOrderStatus}
      />

      <Toast message={toastMessage} />

      {page}
    </div>
  )
}

export default App