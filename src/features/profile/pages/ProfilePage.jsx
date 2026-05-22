import { useState } from "react"

import ProfileSidebar from "../components/ProfileSidebar"
import ProfileAccount from "../components/ProfileAccount"
import ProfileOrders from "../components/ProfileOrders"
import ProfileConfirmPopup from "../components/ProfileConfirmPopup"

function ProfilePage({
  role = "buyer",
  currentUser = null,
  currentArtist = null,
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

      <div className="flex px-[40px] pt-[140px] gap-[40px]">
        <ProfileSidebar
          role={role}
          activeSidebar={activeSidebar}
          setActiveSidebar={setActiveSidebar}
          activeOrderStatus={activeOrderStatus}
          setActiveOrderStatus={setActiveOrderStatus}
          setCurrentPage={setCurrentPage}
        />

        <div
          className={
            currentPage === "orderDetail"
              ? "flex-1 max-w-[960px]"
              : "flex-1 border-[3px] border-[#D9D9D9] p-8"
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
        </div>
      </div>
    </>
  )
}

export default ProfilePage