import { useId, useState } from "react";

const roleOptions = [
  { id: "buyer", label: "Buyer" },
  { id: "artist", label: "Artist" },
];

function SignupRolePage({ setCurrentPage, signupData, setSignupData }) {
  const [selectedRole, setSelectedRole] = useState(signupData.role || "");
  const [error, setError] = useState("");
  const radioName = useId();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedRole) {
      setError("Pilih role terlebih dahulu");
      return;
    }

    setSignupData((prev) => ({ ...prev, role: selectedRole }));

    if (selectedRole === "buyer") {
      setCurrentPage("signupBuyerUsername");
      return;
    }

    setCurrentPage("signupArtistLevel");
  };

  return (
    <main className="w-full min-w-[1280px] min-h-screen relative">

      <section aria-labelledby="signup-title" className="absolute inset-0">
        <h1 id="signup-title" className="absolute top-[239px] left-[529px] font-normal text-black text-6xl tracking-[0] leading-[normal]">
          SIGN UP
        </h1>

        <form onSubmit={handleSubmit} className="contents">
          <fieldset className="absolute top-[325px] left-[376px] w-[533px] h-[165px] rounded-[20px] border-[3px] border-solid border-black">
            <legend className="sr-only">Daftar sebagai</legend>
            <div className="absolute top-[30px] left-[41px] font-normal text-black text-2xl tracking-[0] leading-[normal]">
              Daftar sebagai:
            </div>

            <div className="absolute top-[68px] left-[41px] flex flex-col gap-[9px]">
              {roleOptions.map((option) => (
                <label key={option.id} className="flex items-start gap-[11px] cursor-pointer">
                  <span className="relative mt-1 block w-5 h-5">
                    <input
                      type="radio"
                      name={radioName}
                      value={option.id}
                      checked={selectedRole === option.id}
                      onChange={() => {
                        setSelectedRole(option.id);
                        setError("");
                      }}
                      className="peer sr-only"
                    />
                    <span className="block w-5 h-5 rounded-[10px] border-2 border-solid border-black" />
                    <span className="pointer-events-none absolute top-1/2 left-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black opacity-0 peer-checked:opacity-100" />
                  </span>
                  <span className="font-normal text-black text-2xl tracking-[0] leading-[normal]">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {error && (
            <p className="absolute top-[498px] left-[394px] text-red-600 text-[18px]">
              {error}
            </p>
          )}

          <button type="submit" aria-label="Next" className="absolute top-[526px] left-[370px] w-[533px] h-[66px] rounded-[20px] border-[3px] border-solid border-black">
            <span className="absolute top-[13px] left-[230px] font-normal text-black text-[32px] tracking-[0] leading-[normal]">
              NEXT
            </span>
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignupRolePage;
