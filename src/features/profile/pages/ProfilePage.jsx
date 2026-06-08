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
  profilePhotoUrl = "",
  profilePhotoPosition = { x: 0, y: 0 },
  setProfilePhotoUrl = () => {},
  setProfilePhotoPosition = () => {},
  showToast = () => {},
  orders = [],
  cancelOrder = () => {},
  rejectOrderByArtist = () => {},
  acceptOrderByArtist = () => {},
  confirmPaymentByBuyer = () => {},
  uploadResultByArtist = () => {},
  uploadRevisionByArtist = () => {},
  requestRevisionByBuyer = () => {},
  completeOrderByBuyer = () => {},
  updatePaymentProofLink = () => {},
  updateResultLink = () => {},
  updateRevisionLink = () => {},
  setSelectedOrder = () => {},
}) {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)

  const ComingSoon = ({ label }) => (
    <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--gray-placeholder)" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🚧</div>
      <p style={{ fontSize: 16 }}>Fitur <strong>{label}</strong> sedang dalam pengembangan.</p>
    </div>
  )

  return (
    <>
      {showDeletePopup && (
        <ProfileConfirmPopup
          message="Apakah kamu yakin ingin menghapus akun ini?"
          confirmText="Hapus"
          cancelText="Batal"
          onCancel={() => setShowDeletePopup(false)}
          onConfirm={onDeleteAccount}
        />
      )}
      {showLogoutPopup && (
        <ProfileConfirmPopup
          message="Apakah kamu yakin ingin Log out?"
          confirmText="Log out"
          cancelText="Batal"
          onCancel={() => setShowLogoutPopup(false)}
          onConfirm={() => { setShowLogoutPopup(false); onLogout() }}
        />
      )}

      <div className="pk-page pk-profile-layout">
        {/* SIDEBAR */}
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

        {/* CONTENT */}
        <div className={`pk-profile-content ${currentPage === "orderDetail" ? "order-detail-open" : ""}`}>
          {activeSidebar === "account" && (
            <ProfileAccount
              role={role}
              currentUser={currentUser}
              phone={phone}
              setPhone={setPhone}
              gender={gender}
              setGender={setGender}
              profilePhotoUrl={profilePhotoUrl}
              profilePhotoPosition={profilePhotoPosition}
              setProfilePhotoUrl={setProfilePhotoUrl}
              setProfilePhotoPosition={setProfilePhotoPosition}
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
              uploadResultByArtist={uploadResultByArtist}
              uploadRevisionByArtist={uploadRevisionByArtist}
              requestRevisionByBuyer={requestRevisionByBuyer}
              completeOrderByBuyer={completeOrderByBuyer}
              updatePaymentProofLink={updatePaymentProofLink}
              updateResultLink={updateResultLink}
              updateRevisionLink={updateRevisionLink}
              setSelectedOrder={setSelectedOrder}
            />
          )}

          {role === "artist" && activeSidebar === "bank"    && <ComingSoon label="Bank" />}
          {role === "artist" && activeSidebar === "rating"  && <ComingSoon label="Rating" />}
          {role === "artist" && activeSidebar === "reviews" && <ComingSoon label="Riwayat Ulasan" />}
        </div>
      </div>
    </>
  )
}

export default ProfilePage
