import { FiUser, FiImage } from "react-icons/fi"
import { LuClipboardList } from "react-icons/lu"

const orderItems = [
  { value: "artist_incoming",  label: "Pesanan Masuk" },
  { value: "artist_process",   label: "Diproses" },
  { value: "artist_completed", label: "Selesai" },
  { value: "artist_cancelled", label: "Dibatalkan" },
]

function ArtistDashboardSidebar({
  activeSidebar = "account",
  setActiveSidebar = () => {},
  activeOrderStatus = "artist_incoming",
  setActiveOrderStatus = () => {},
  setCurrentPage = () => {},
}) {
  return (
    <div className="pk-sidebar">
      <p className="pk-sidebar-title">Dashboard Artist</p>
      <button
        onClick={() => { setActiveSidebar("account"); setCurrentPage("profile") }}
        className={`pk-sidebar-btn ${activeSidebar === "account" ? "active" : ""}`}
      >
        <FiUser style={{ fontSize: 18 }} /> Akun
      </button>

      <hr className="pk-divider" />

      <button
        onClick={() => { setActiveSidebar("portfolio"); setCurrentPage("profile") }}
        className={`pk-sidebar-btn ${activeSidebar === "portfolio" ? "active" : ""}`}
      >
        <FiImage style={{ fontSize: 18 }} /> Portofolio
      </button>

      <hr className="pk-divider" />

      <button
        onClick={() => { setActiveSidebar("orders"); setActiveOrderStatus("artist_incoming"); setCurrentPage("profile") }}
        className={`pk-sidebar-btn ${activeSidebar === "orders" ? "active" : ""}`}
      >
        <LuClipboardList style={{ fontSize: 18 }} /> Riwayat Penjualan
      </button>

      {activeSidebar === "orders" && (
        <div className="pk-sidebar-sub">
          {orderItems.map((item) => (
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

export default ArtistDashboardSidebar
