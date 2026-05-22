import { FiUser, FiMessageCircle } from "react-icons/fi"
import { LuClipboardList } from "react-icons/lu"

function ProfileSidebar({
  role = "buyer",
  activeSidebar = "account",
  setActiveSidebar = () => {},
  activeOrderStatus = "waiting",
  setActiveOrderStatus = () => {},
  setCurrentPage = () => {},
}) {
  return (
    <div className="w-[240px]">
      <button
        onClick={() => setActiveSidebar("account")}
        className="flex items-center gap-3 text-[24px]"
      >
        <FiUser />
        <span className={activeSidebar === "account" ? "text-yellow-500" : ""}>
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
            {role === "artist" ? (
              "Riwayat Penjualan"
            ) : (
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
        <span>Riwayat Ulasan</span>
      </button>
    </div>
  )
}

export default ProfileSidebar