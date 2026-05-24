import { useState } from "react"

import ProfileSidebar from "../components/ProfileSidebar"
import ProfileAccount from "../components/ProfileAccount"
import ProfileOrders from "../components/ProfileOrders"
import ProfileConfirmPopup from "../components/ProfileConfirmPopup"

import ArtistDashboardSidebar from "../../artistDashboard/components/ArtistDashboardSidebar"
import ArtistPortfolioPage from "../../artistDashboard/components/ArtistPortfolioPage"

function ProfilePage({
  role = "buyer",
  currentUser = null,
  currentArtist = null,
  artistPortfolio = null,
  currentPage = "profile",
  selectedOrder = null,
  activeSidebar = "account",
  setActiveSidebar = () => {},
  activeOrderStatus = "waiting",
  setActiveOrderStatus = () => {},
  showDeletePopup = false,
  setShowDeletePopup = () => {},
  setCurrentPage = () => {},
  onDeleteAccount = () => {},
  onDeletePortfolio = () => {},
  onDeleteProduct = () => {},
  onPublishPortfolio = () => {},
  onLogout = () => {},
  phone = "",
  setPhone = () => {},
  gender = "",
  setGender = () => {},
  showToast = () => {},
  orders = [],
  cancelOrder = () => {},
  rejectOrderByArtist = () => {},
  acceptOrderByArtist = () => {},
  confirmPaymentByBuyer = () => {},
  confirmPaymentByArtist = () => {},
  uploadResultByArtist = () => {},
  setSelectedOrder = () => {},
}) {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)

  return (
    <>
      {showDeletePopup && (
        <ProfileConfirmPopup
          message="Apakah anda yakin ingin menghapus akun ini?"
          confirmText="Hapus"
          cancelText="Cancel"
          onCancel={() => setShowDeletePopup(false)}
          onConfirm={onDeleteAccount}
        />
      )}

      {showLogoutPopup && (
        <ProfileConfirmPopup
          message="Apakah Anda yakin ingin Log out dari akun ini?"
          confirmText="Log out"
          cancelText="Cancel"
          onCancel={() => setShowLogoutPopup(false)}
          onConfirm={() => {
            setShowLogoutPopup(false)
            onLogout()
          }}
        />
      )}

      <div className="flex w-full max-w-full overflow-x-hidden px-[40px] pt-[140px] pb-[140px] gap-[40px]">
        {role === "artist" ? (
          <ArtistDashboardSidebar
            activeSidebar={activeSidebar}
            setActiveSidebar={setActiveSidebar}
            activeOrderStatus={activeOrderStatus}
            setActiveOrderStatus={setActiveOrderStatus}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <ProfileSidebar
            role={role}
            activeSidebar={activeSidebar}
            setActiveSidebar={setActiveSidebar}
            activeOrderStatus={activeOrderStatus}
            setActiveOrderStatus={setActiveOrderStatus}
            setCurrentPage={setCurrentPage}
          />
        )}

        <div
  className={
    currentPage === "orderDetail"
      ? "flex-1 min-w-0"
      : "flex-1 min-w-0 border-[3px] border-[#D9D9D9] p-8"
  }
>
          {activeSidebar === "account" && (
            <ProfileAccount
              role={role}
              currentUser={currentUser}
              phone={phone}
              setPhone={setPhone}
              gender={gender}
              setGender={setGender}
              showToast={showToast}
              setShowDeletePopup={setShowDeletePopup}
              setShowLogoutPopup={setShowLogoutPopup}
            />
          )}

          {role === "artist" && activeSidebar === "portfolio" && (
            <ArtistPortfolioPage
  portfolio={artistPortfolio}
  onUploadClick={() => setCurrentPage("artistPortfolioUpload")}
  onDeleteClick={onDeletePortfolio}
  onDeleteProduct={onDeleteProduct}
  onPublishClick={onPublishPortfolio}
  onAddProductClick={() => setCurrentPage("artistProductForm")}
/>
          )}

          {activeSidebar === "orders" && (
            <ProfileOrders
              role={role}
              currentArtist={currentArtist}
              currentPage={currentPage}
              selectedOrder={selectedOrder}
              activeOrderStatus={activeOrderStatus}
              setCurrentPage={setCurrentPage}
              orders={orders}
              cancelOrder={cancelOrder}
              rejectOrderByArtist={rejectOrderByArtist}
              acceptOrderByArtist={acceptOrderByArtist}
              confirmPaymentByBuyer={confirmPaymentByBuyer}
              confirmPaymentByArtist={confirmPaymentByArtist}
              uploadResultByArtist={uploadResultByArtist}
              setSelectedOrder={setSelectedOrder}
            />
          )}

          {role === "artist" && activeSidebar === "bank" && (
            <div className="text-[24px]">
              Fitur Bank akan dibuat setelah Portofolio selesai.
            </div>
          )}

          {role === "artist" && activeSidebar === "rating" && (
            <div className="text-[24px]">
              Fitur Rating akan dibuat setelah Portofolio selesai.
            </div>
          )}

          {role === "artist" && activeSidebar === "reviews" && (
            <div className="text-[24px]">
              Fitur Riwayat Ulasan akan dibuat setelah Portofolio selesai.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProfilePage