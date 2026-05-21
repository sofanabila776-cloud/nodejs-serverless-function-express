import { useState } from "react";
import { registerUser } from "../services/authService";

function SignupBuyerUsernamePage({ setCurrentPage, signupData, setSignupData, onLoginSuccess }) {
  const [username, setUsername] = useState(signupData.username || "");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username.trim()) {
      setError("Username wajib diisi");
      return;
    }

    try {
      const payload = { ...signupData, role: "buyer", username };
      const session = await registerUser(payload);
      setSignupData({});
      onLoginSuccess(session.user);
    } catch (err) {
      setError(err.message || "Username sudah digunakan");
    }
  };

  return (
    <main className="w-full min-w-[1280px] min-h-screen relative">

      <section aria-labelledby="signup-title" className="absolute top-[238px] left-[374px] w-[533px]">
        <h1 id="signup-title" className="w-full text-center font-normal text-black text-6xl tracking-[0] leading-[normal] whitespace-nowrap">
          SIGN UP
        </h1>

        <form className="mt-[34px] w-[533px]" onSubmit={handleSubmit}>
          <label htmlFor="buyer-username" className="sr-only">Buat username</label>

          <div className="relative w-[533px] h-[66px] rounded-[20px] border-[3px] border-solid border-black">
            <input
              id="buyer-username"
              name="username"
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError("");
              }}
              placeholder="Buat username"
              className="absolute top-0 left-0 w-full h-full rounded-[20px] px-[18px] font-normal text-black text-2xl tracking-[0] leading-[normal] placeholder:text-[#888181] outline-none"
              autoComplete="username"
            />
          </div>

          {error && <p className="mt-2 ml-[18px] text-red-600 text-[18px]">{error}</p>}

          <button type="submit" className="mt-[41px] w-[533px] h-[66px] rounded-[20px] border-[3px] border-solid border-black flex items-center justify-center font-normal text-black text-[32px] tracking-[0] leading-[normal]">
            SIGN UP
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignupBuyerUsernamePage;
