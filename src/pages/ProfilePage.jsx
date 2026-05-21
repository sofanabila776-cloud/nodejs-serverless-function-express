import {
  FiUser,
  FiTrash2,
  FiEdit2,
  FiMessageCircle,
} from "react-icons/fi"

import { LuClipboardList } from "react-icons/lu"

import OrderCard from "../components/OrderCard"
import OrderDetailPage from "./OrderDetailPage"

import {
  BUYER_STATUS_GROUPS,
  ARTIST_STATUS_GROUPS,
} from "../constants/orderStatus"

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
  setIsLoggedIn = () => {},
  setCurrentPage = () => {},
  onDeleteAccount = () => {},
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
  const statusGroups =
    role === "artist"
      ? ARTIST_STATUS_GROUPS
      : BUYER_STATUS_GROUPS

  const defaultStatus =
    role === "artist"
      ? "artist_incoming"
      : "waiting"

  const currentStatusGroup =
    statusGroups[activeOrderStatus] || statusGroups[defaultStatus]

  const safeOrders = Array.isArray(orders) ? orders : []

  const visibleOrders =
    role === "artist"
      ? safeOrders.filter(
          (order) =>
            order?.artistId === currentArtist?.id ||
            order?.artist === currentArtist?.name
        )
      : safeOrders

  const filteredOrders = visibleOrders.filter((order) =>
    currentStatusGroup.includes(order?.status)
  )

  const emptyOrderText = {
    waiting: "Tidak ada pesanan yang menunggu persetujuan",
    unpaid: "Tidak ada pesanan yang belum dibayar",
    process: "Tidak ada pesanan yang sedang diproses",
    revision: "Tidak ada pesanan revisi",
    completed: "Tidak ada pesanan yang selesai",
    cancelled: "Tidak ada pesanan yang dibatalkan",

    artist_incoming: "Tidak ada pesanan masuk",
    artist_process: "Tidak ada pesanan yang sedang diproses",
    artist_completed: "Tidak ada pesanan yang selesai",
    artist_cancelled: "Tidak ada pesanan yang batal",
  }

  const currentEmptyOrderText =
    emptyOrderText[activeOrderStatus] || "Tidak ada pesanan"

  const profileUsername =
    currentUser?.username || currentUser?.name || "unainaina"

  const profileEmail =
    currentUser?.email || "Email"

  const artistLevelLabel =
    {
      beginner: "Beginner",
      intermediate: "Intermediate",
      professional: "Professional",
    }[currentUser?.artistLevel] || currentUser?.artistLevel

  return (
    <>
      {showDeletePopup && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" />

          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F5F5F5] rounded-[18px] p-8 z-50 shadow-lg">
            <p className="text-[20px] text-center">
              Apakah anda yakin ingin menghapus akun ini?
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="w-[100px] h-[42px] border border-black rounded-[10px] text-[20px]"
              >
                Cancel
              </button>

              <button
                onClick={onDeleteAccount}
                className="w-[100px] h-[42px] bg-black text-white rounded-[10px] text-[20px]"
              >
                Hapus
              </button>
            </div>
          </div>
        </>
      )}

      <div className="flex px-[40px] pt-[140px] gap-[40px]">
        <div className="w-[240px]">
          <button
            onClick={() => setActiveSidebar("account")}
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
            onClick={() => setActiveSidebar("orders")}
            className="flex items-start gap-3 text-[24px] mt-5"
          >
            <LuClipboardList className="min-w-[24px] min-h-[24px] mt-1" />

            <div className="text-left">
              <p>
                {role === "artist" ? "Riwayat Penjualan" : (
                  <>
                    Riwayat
                    <br />
                    Pesanan
                  </>
                )}
              </p>

              {activeSidebar === "orders" && (
                <div className="mt-4 space-y-3 text-[20px]">
                  {role === "artist" ? (
                    <>
                      <p
                        onClick={() => {
                          setActiveOrderStatus("artist_incoming")
                          setCurrentPage("profile")
                        }}
                        className={
                          activeOrderStatus === "artist_incoming"
                            ? "text-yellow-500 cursor-pointer"
                            : "cursor-pointer"
                        }
                      >
                        Pesanan Masuk
                      </p>

                      <p
                        onClick={() => {
                          setActiveOrderStatus("artist_process")
                          setCurrentPage("profile")
                        }}
                        className={
                          activeOrderStatus === "artist_process"
                            ? "text-yellow-500 cursor-pointer"
                            : "cursor-pointer"
                        }
                      >
                        Pesanan Diproses
                      </p>

                      <p
                        onClick={() => {
                          setActiveOrderStatus("artist_completed")
                          setCurrentPage("profile")
                        }}
                        className={
                          activeOrderStatus === "artist_completed"
                            ? "text-yellow-500 cursor-pointer"
                            : "cursor-pointer"
                        }
                      >
                        Pesanan Selesai
                      </p>

                      <p
                        onClick={() => {
                          setActiveOrderStatus("artist_cancelled")
                          setCurrentPage("profile")
                        }}
                        className={
                          activeOrderStatus === "artist_cancelled"
                            ? "text-yellow-500 cursor-pointer"
                            : "cursor-pointer"
                        }
                      >
                        Pesanan Batal
                      </p>
                    </>
                  ) : (
                    <>
                      <p
                        onClick={() => {
                          setActiveOrderStatus("waiting")
                          setCurrentPage("profile")
                        }}
                        className={
                          activeOrderStatus === "waiting"
                            ? "text-yellow-500 cursor-pointer"
                            : "cursor-pointer"
                        }
                      >
                        Menunggu persetujuan
                      </p>

                      <p
                        onClick={() => {
                          setActiveOrderStatus("unpaid")
                          setCurrentPage("profile")
                        }}
                        className={
                          activeOrderStatus === "unpaid"
                            ? "text-yellow-500 cursor-pointer"
                            : "cursor-pointer"
                        }
                      >
                        Belum dibayar
                      </p>

                      <p
                        onClick={() => {
                          setActiveOrderStatus("process")
                          setCurrentPage("profile")
                        }}
                        className={
                          activeOrderStatus === "process"
                            ? "text-yellow-500 cursor-pointer"
                            : "cursor-pointer"
                        }
                      >
                        Diproses
                      </p>

                      <p
                        onClick={() => {
                          setActiveOrderStatus("revision")
                          setCurrentPage("profile")
                        }}
                        className={
                          activeOrderStatus === "revision"
                            ? "text-yellow-500 cursor-pointer"
                            : "cursor-pointer"
                        }
                      >
                        Revisi
                      </p>

                      <p
                        onClick={() => {
                          setActiveOrderStatus("completed")
                          setCurrentPage("profile")
                        }}
                        className={
                          activeOrderStatus === "completed"
                            ? "text-yellow-500 cursor-pointer"
                            : "cursor-pointer"
                        }
                      >
                        Selesai
                      </p>

                      <p
                        onClick={() => {
                          setActiveOrderStatus("cancelled")
                          setCurrentPage("profile")
                        }}
                        className={
                          activeOrderStatus === "cancelled"
                            ? "text-yellow-500 cursor-pointer"
                            : "cursor-pointer"
                        }
                      >
                        Dibatalkan
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </button>

          <button className="flex items-center gap-3 text-[24px] mt-5">
            <FiMessageCircle />

            <span>
              Riwayat Ulasan
            </span>
          </button>
        </div>

        <div
          className={
            currentPage === "orderDetail"
              ? "flex-1 max-w-[960px]"
              : "flex-1 border-[3px] border-[#D9D9D9] p-8"
          }
        >
          {activeSidebar === "account" && (
            <>
              <div className="flex justify-between items-center">
                <p className="text-[28px]">
                  Profil Akun
                </p>

                <button onClick={() => setShowDeletePopup(true)}>
                  <FiTrash2 className="text-[24px]" />
                </button>
              </div>

              <div className="flex gap-[40px] mt-10">
                <div className="flex flex-col items-center">
                  <div className="relative w-[140px] h-[140px] rounded-full bg-[#D9D9D9]">
                    <button className="absolute bottom-0 right-0 w-[38px] h-[38px] rounded-full bg-black flex items-center justify-center">
                      <FiEdit2 className="text-white text-[18px]" />
                    </button>
                  </div>

                  <p className="text-[24px] mt-4">
                    {profileUsername}
                  </p>

                  {role === "artist" && artistLevelLabel && (
                    <p className="text-[18px] mt-1 text-[#666666]">
                      Level: {artistLevelLabel}
                    </p>
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-[20px]">
                    Email
                  </p>

                  <input
                    value={profileEmail}
                    readOnly
                    className="w-full h-[56px] border-[3px] border-black rounded-[14px] px-4 text-[20px] outline-none mt-2"
                  />

                  <p className="text-[20px] mt-5">
                    Nomor Telepon
                  </p>

                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Masukkan nomor telepon"
                    className="w-full h-[56px] border-[3px] border-black rounded-[14px] px-4 text-[20px] outline-none mt-2 placeholder:text-[#8E8E8E]"
                  />

                  <p className="text-[20px] mt-5">
                    Jenis Kelamin
                  </p>

                  <div className="flex gap-8 mt-3 text-[20px]">
                    {[
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
                          onChange={() => setGender(item)}
                        />

                        {item}
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      onClick={() => showToast("Profil berhasil disimpan")}
                      className="w-[140px] h-[50px] bg-black text-white rounded-[12px] text-[20px]"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSidebar === "orders" && (
            currentPage === "orderDetail" ? (
              <OrderDetailPage
                role={role}
                selectedOrder={selectedOrder}
                setCurrentPage={setCurrentPage}
                cancelOrder={cancelOrder}
                rejectOrderByArtist={rejectOrderByArtist}
                acceptOrderByArtist={acceptOrderByArtist}
                confirmPaymentByBuyer={confirmPaymentByBuyer}
                confirmPaymentByArtist={confirmPaymentByArtist}
                uploadResultByArtist={uploadResultByArtist}
              />
            ) : (
              <div className="space-y-5">
                {filteredOrders.length === 0 ? (
                  <div className="border-[3px] border-[#D9D9D9] h-[160px] flex items-center justify-center text-[20px]">
                    {currentEmptyOrderText}
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      role={role}
                      order={order}
                      cancelOrder={cancelOrder}
                      setSelectedOrder={setSelectedOrder}
                      setCurrentPage={setCurrentPage}
                    />
                  ))
                )}
              </div>
            )
          )}
        </div>
      </div>
    </>
  )
}

export default ProfilePage