import {
  FiSearch,
  FiBell,
  FiHeart,
  FiUser,
} from "react-icons/fi"

function Header({
  currentPage,
  setCurrentPage,
  isLoggedIn,
  setIsLoggedIn,
  role = "buyer",
  toggleRole = () => {},
}) {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-[40px] py-[20px] flex items-center justify-between">

      {/* LOGO */}
      <button
        onClick={() => setCurrentPage("home")}
        className="text-[36px]"
      >
        PICKARYA
      </button>

      {/* SEARCH */}
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

      {/* RIGHT MENU */}
      <div className="flex items-center gap-5 ml-auto">
        <button
          onClick={toggleRole}
          className="text-[20px] border-[2px] border-black px-4 py-2 rounded-[12px] whitespace-nowrap"
        >
          {role === "buyer" ? "POV Buyer" : "POV Artist"}
        </button>

        {
          !isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="text-[20px] whitespace-nowrap"
            >
              LOG IN
            </button>
          ) : (
            <>
              <FiBell className="text-[24px]" />

              <FiHeart className="text-[24px]" />

              <button
                onClick={() => setCurrentPage("profile")}
              >
                <FiUser className="text-[24px]" />
              </button>
            </>
          )
        }
      </div>

    </div>
  )
}

export default Header