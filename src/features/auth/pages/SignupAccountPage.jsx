import { useId, useState } from "react";
import { checkEmailExists } from "../services/authService";

function SignupAccountPage({ setCurrentPage, signupData, setSignupData }) {
  const emailId = useId();
  const passwordId = useId();
  const [email, setEmail] = useState(signupData.email || "");
  const [password, setPassword] = useState(signupData.password || "");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({ email: "", password: "" });

    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email wajib diisi" }));
      return;
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password wajib diisi" }));
      return;
    }

    const emailExists = await checkEmailExists(email);

    if (emailExists) {
      setErrors((prev) => ({ ...prev, email: "Email sudah terdaftar/digunakan" }));
      return;
    }

    setSignupData((prev) => ({ ...prev, email, password }));
    setCurrentPage("signupRole");
  };

  return (
    <main className="pk-auth-page w-full min-w-[1280px] min-h-[900px] relative pb-[140px]">

      <section aria-labelledby="signup-heading" className="absolute inset-0">
        <h1 id="signup-heading" className="absolute top-[201px] left-[529px] font-normal text-black text-6xl text-center tracking-[0] leading-[normal]">
          SIGN UP
        </h1>

        <p className="absolute top-[282px] left-[481px] font-normal text-black text-2xl tracking-[0] leading-[normal]">
          Sudah memiliki akun?
        </p>

        <button
          type="button"
          onClick={() => setCurrentPage("login")}
          className="absolute top-[282px] left-[737px] z-10 font-normal text-black text-2xl text-right tracking-[0] leading-[normal] underline"
        >
          Log In
        </button>

        <form onSubmit={handleSubmit} className="contents" aria-label="Sign up form">
          <div className="absolute top-[338px] left-[374px] w-[533px] h-[66px] rounded-[20px] border-[3px] border-solid border-black">
            <label htmlFor={emailId} className="sr-only">Email</label>
            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              placeholder="Email"
              className="w-full h-full rounded-[20px] px-[16px] py-0 font-normal text-black text-2xl tracking-[0] leading-[normal] placeholder:text-[#888181] outline-none"
            />
          </div>

          {errors.email && (
            <p className="absolute top-[407px] left-[392px] text-red-600 text-[18px]">
              {errors.email}
            </p>
          )}

          <div className="absolute top-[433px] left-[374px] w-[533px] h-[66px] rounded-[20px] border-[3px] border-solid border-black">
            <label htmlFor={passwordId} className="sr-only">Buat password</label>
            <input
              id={passwordId}
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              placeholder="Buat password"
              className="w-full h-full rounded-[20px] px-[16px] py-0 font-normal text-black text-2xl tracking-[0] leading-[normal] placeholder:text-[#888181] outline-none"
            />
          </div>

          {errors.password && (
            <p className="absolute top-[502px] left-[392px] text-red-600 text-[18px]">
              {errors.password}
            </p>
          )}

          <button type="submit" className="absolute top-[550px] left-[374px] w-[533px] h-[66px] rounded-[20px] border-[3px] bg-black text-white flex items-center justify-center font-normal text-[32px]">
            NEXT
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignupAccountPage;
