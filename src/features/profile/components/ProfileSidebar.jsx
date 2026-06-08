import { FiUser } from "react-icons/fi"
import { LuClipboardList } from "react-icons/lu"

function ProfileSidebar({
  role = "buyer",
  activeSidebar = "account",
  setActiveSidebar = () => {},
  activeOrderStatus = "waiting",
  setActiveOrderStatus = () => {},
  setCurrentPage = () => {},
}) {
  const orderSubItems = role === "artist"
    ? [
        { value: "artist_incoming",  label: "Pesanan Masuk" },
        { value: "artist_process",   label: "Diproses" },
        { value: "artist_completed", label: "Selesai" },
        { value: "artist_cancelled", label: "Dibatalkan" },
      ]
    : [
        { value: "waiting",   label: "Menunggu Persetujuan" },
        { value: "unpaid",    label: "Belum Dibayar" },
        { value: "process",   label: "Diproses" },
        { value: "revision",  label: "Revisi" },
        { value: "completed", label: "Selesai" },
        { value: "cancelled", label: "Dibatalkan" },
      ]

  return (
    <div className="pk-sidebar">
      <p className="pk-sidebar-title">Menu Profil</p>
      <button
        onClick={() => { setActiveSidebar("account"); setCurrentPage("profile") }}
        className={`pk-sidebar-btn ${activeSidebar === "account" ? "active" : ""}`}
      >
        <FiUser style={{ fontSize: 18, flexShrink: 0 }} />
        Akun
      </button>

      <hr className="pk-divider" />

      <button
        onClick={() => {
          setActiveSidebar("orders")
          setActiveOrderStatus(role === "artist" ? "artist_incoming" : "waiting")
          setCurrentPage("profile")
        }}
        className={`pk-sidebar-btn ${activeSidebar === "orders" ? "active" : ""}`}
      >
        <LuClipboardList style={{ fontSize: 18, flexShrink: 0 }} />
        {role === "artist" ? "Riwayat Penjualan" : "Riwayat Pesanan"}
      </button>

      {activeSidebar === "orders" && (
        <div className="pk-sidebar-sub">
          {orderSubItems.map((item) => (
            <button
              key={item.value}
              onClick={(e) => { e.stopPropagation(); setActiveOrderStatus(item.value); setCurrentPage("profile") }}
              className={`pk-sidebar-sub-btn ${activeOrderStatus === item.value ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProfileSidebar
