import { FiSearch, FiHeart, FiUser } from "react-icons/fi"

const AUTH_PAGES = [
  "login", "signupAccount", "signupRole",
  "signupBuyerUsername", "signupArtistLevel", "signupArtistUsername",
]

function Header({
  currentPage,
  setCurrentPage,
  isLoggedIn,
  role = "buyer",
  setActiveSidebar = () => {},
  setActiveOrderStatus = () => {},
  searchQuery = "",
  setSearchQuery = () => {},
}) {
  const isAuthPage = AUTH_PAGES.includes(currentPage)
  const roleLabel = role === "artist" ? "Artist" : "Buyer"

  const handleLogoClick = () => {
    if (isLoggedIn && role === "artist") {
      setCurrentPage("profile")
      setActiveSidebar("account")
      setActiveOrderStatus("artist_incoming")
      return
    }
    setCurrentPage("home")
  }

  const openProfile = () => {
    setCurrentPage("profile")
    setActiveSidebar("account")
    if (role === "artist") setActiveOrderStatus("artist_incoming")
  }

  return (
    <header className="pk-header">
      {/* LOGO */}
      <button onClick={handleLogoClick} style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <span className="pk-logo">PICKARYA</span>
        {isLoggedIn && (
          <span className="pk-logo-role">{roleLabel}</span>
        )}
      </button>

      {/* SEARCH */}
      {currentPage === "home" && role === "buyer" && (
        <div className="pk-search">
          <FiSearch />
          <input
            type="text"
            placeholder="Cari username Artist…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* ACTIONS */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {!isLoggedIn && !isAuthPage && (
          <button
            onClick={() => setCurrentPage("login")}
            className="pk-btn pk-btn-primary"
            style={{ height: 40, padding: "0 20px", fontSize: 14 }}
          >
            LOG IN
          </button>
        )}

        {isLoggedIn && (
          <>
            {role === "buyer" && (
              <button
                onClick={() => setCurrentPage("likedPortfolio")}
                className="pk-icon-btn"
                aria-label="Koleksi favorit"
              >
                <FiHeart style={{ fontSize: 20 }} />
              </button>
            )}
            <button onClick={openProfile} className="pk-icon-btn" aria-label="Profil">
              <FiUser style={{ fontSize: 20 }} />
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
