import { useId, useState } from "react";

const artistLevels = [
  { id: "beginner", label: "Beginner", widthClass: "w-[101px]" },
  { id: "intermediate", label: "Intermediate", widthClass: "w-36" },
  { id: "professional", label: "Professional", widthClass: "w-[139px]" },
];

const levelDescriptions = [
  {
    title: "Beginner",
    text: "Untuk artist yang baru mulai menjual karya digital di PICKARYA. Cocok untuk artist yang sedang membangun portofolio, belum memiliki banyak dokumentasi penjualan, atau masih mencari audiens dan pengalaman commission pertama.",
  },
  {
    title: "Intermediate",
    text: "Untuk artist yang sudah pernah menjual karya digital dan memiliki portofolio lebih berkembang. Biasanya sudah pernah menerima pesanan, punya contoh karya lebih lengkap, dan mulai memiliki bukti atau dokumentasi pengalaman penjualan.",
  },
  {
    title: "Professional",
    text: "Untuk artist yang sudah memiliki reputasi dan pengalaman lebih luas. Cocok untuk artist yang sering menerima pesanan, memiliki banyak portofolio, mendapat respons positif dari buyer, dan memiliki pengalaman penjualan cukup banyak, misalnya lebih dari 10 commission.",
  },
];

function SignupArtistLevelPage({ setCurrentPage, signupData, setSignupData }) {
  const [selectedLevel, setSelectedLevel] = useState(signupData.artistLevel || "");
  const [showLevelInfo, setShowLevelInfo] = useState(false);
  const [error, setError] = useState("");
  const groupId = useId();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedLevel) {
      setError("Pilih level artist terlebih dahulu");
      return;
    }

    setSignupData((prev) => ({ ...prev, artistLevel: selectedLevel }));
    setCurrentPage("signupArtistUsername");
  };

  return (
    <main className="w-full min-w-[1280px] min-h-screen relative">
      {showLevelInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-8">
          <div className="relative w-[900px] max-h-[620px] overflow-y-auto rounded-[24px] border-[3px] border-black bg-white px-8 py-7">
            <button
              type="button"
              onClick={() => setShowLevelInfo(false)}
              className="absolute top-5 right-6 text-[28px] leading-none"
              aria-label="Tutup penjelasan level"
            >
              ×
            </button>

            <h3 className="text-[30px] font-normal mb-6 text-center">
              Penjelasan Level Artist
            </h3>

            <div className="grid grid-cols-3 gap-5">
              {levelDescriptions.map((level) => (
                <article key={level.title} className="rounded-[18px] border-[2px] border-black p-5">
                  <h4 className="text-[24px] font-normal mb-3">{level.title}</h4>
                  <p className="text-[17px] leading-relaxed">{level.text}</p>
                </article>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowLevelInfo(false)}
              className="mt-7 mx-auto block w-[240px] h-[52px] rounded-[18px] border-[3px] border-black text-[22px]"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <section aria-labelledby="signup-title" className="absolute inset-0">
        <h2 id="signup-title" className="absolute top-[215px] left-[529px] font-normal text-black text-6xl tracking-[0] leading-[normal]">
          SIGN UP
        </h2>

        <form onSubmit={handleSubmit}>
          <fieldset className="top-[301px] left-[375px] h-52 absolute w-[533px] rounded-[20px] border-[3px] border-solid border-black m-0 p-0">
            <legend className="sr-only">Artist level selection</legend>
            <div className="absolute top-[30px] left-[41px] font-normal text-black text-2xl tracking-[0] leading-[normal]">
              Pilih level artist:
            </div>

            <div className="absolute top-[68px] left-[41px]">
              {artistLevels.map((level, index) => {
                const inputId = `${groupId}-${level.id}`;

                return (
                  <label
                    key={level.id}
                    htmlFor={inputId}
                    className={`absolute left-0 flex items-start gap-[11px] cursor-pointer ${
                      index === 0
                        ? "top-0 w-[134px] h-[29px]"
                        : index === 1
                          ? "top-[38px] w-[177px] h-[29px]"
                          : "top-[76px] w-[172px] h-[29px]"
                    }`}
                  >
                    <span className="relative mt-1 block w-5 h-5">
                      <input
                        id={inputId}
                        name="artistLevel"
                        type="radio"
                        value={level.id}
                        checked={selectedLevel === level.id}
                        onChange={(event) => {
                          setSelectedLevel(event.target.value);
                          setError("");
                        }}
                        className="peer sr-only"
                      />
                      <span className="block w-5 h-5 rounded-[10px] border-2 border-solid border-black" />
                      <span className="pointer-events-none absolute top-1/2 left-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black opacity-0 peer-checked:opacity-100" />
                    </span>
                    <span className={`${level.widthClass} h-[29px] font-normal text-black text-2xl tracking-[0] leading-[normal]`}>
                      {level.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={() => setShowLevelInfo(true)}
            className="absolute top-[522px] left-[438px] text-[22px] text-black underline"
          >
            Lihat penjelasan level &gt;
          </button>

          {error && (
            <p className="absolute top-[548px] left-[394px] text-red-600 text-[18px]">
              {error}
            </p>
          )}

          <div className="top-[582px] left-[372px] w-[535px] h-[66px] absolute">
            <button type="submit" aria-label="Next" className="relative w-[533px] h-[66px] rounded-[20px] border-[3px] border-solid border-black">
              <span className="absolute top-[13px] left-[230px] font-normal text-black text-[32px] tracking-[0] leading-[normal]">
                NEXT
              </span>
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default SignupArtistLevelPage;
