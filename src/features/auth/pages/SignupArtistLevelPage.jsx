import { useId, useState } from "react";

const artistLevels = [
  { id: "beginner", label: "Beginner", widthClass: "w-[101px]" },
  { id: "intermediate", label: "Intermediate", widthClass: "w-36" },
  { id: "professional", label: "Professional", widthClass: "w-[139px]" },
];

const levelDescriptions = [
  {
    title: "Beginner",
    text: "Pernah menyelesaikan 0–5 project/commission, memiliki 1–2 karya portfolio, belum banyak memiliki testimoni atau review buyer, masih membangun pengalaman menerima brief dari client",
  },
  {
    title: "Intermediate",
    text: "Pernah menyelesaikan 5–20 project/commission, memiliki 3-5 karya portfolio, sudah pernah berkomunikasi dengan buyer/client, memiliki beberapa bukti pengalaman/testimoni",
  },
  {
    title: "Professional",
    text: "Pernah menyelesaikan lebih dari 20 project/commission, memiliki lebih dari 5 karya portfolio, memiliki review/dokumentasi pengalaman yang cukup kuat, dan mampu menjaga kualitas karya secara konsisten",
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
  <main>
    {showLevelInfo && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
        <div
  className="pk-card"
  style={{
    width: "100%",
    maxWidth: 820,
    maxHeight: "70vh",
    overflowY: "auto",
    padding: 24,
    position: "relative",
  }}
>
          <button
            type="button"
            onClick={() => setShowLevelInfo(false)}
            style={{
              position: "absolute",
              right: 20,
              top: 16,
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 28,
              color: "#666",
            }}
          >
            ×
          </button>

          <h2
            style={{
              textAlign: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "var(--text-dark)",
              marginBottom: 28,
            }}
          >
            Penjelasan Level Artist
          </h2>

          <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 16,
  }}
>
            {levelDescriptions.map((level) => (
              <div
                key={level.title}
                style={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 18,
                  padding: 16,
                  background: "#fff",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                }}
              >
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--blue-primary)",
                    marginBottom: 12,
                  }}
                >
                  {level.title}
                </h3>

                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "#444",
                  }}
                >
                  {level.text}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 28,
            }}
          >
            <button
              type="button"
              onClick={() => setShowLevelInfo(false)}
              className="pk-btn pk-btn-primary"
              style={{
                minWidth: 180,
                height: 52,
              }}
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    )}

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-top)",
        paddingTop: 72,
      }}
    >
      <div
        className="pk-card"
        style={{
          width: "100%",
          maxWidth: 440,
          padding: "48px 40px",
          borderRadius: "var(--radius-xl)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <p
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "var(--blue-primary)",
              letterSpacing: "0.06em",
              marginBottom: 6,
            }}
          >
            PICKARYA
          </p>

          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "var(--text-dark)",
              margin: 0,
            }}
          >
            SIGN UP
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <fieldset
            style={{
              border: "1.5px solid rgba(51,51,51,0.13)",
              borderRadius: 16,
              padding: "18px 16px",
              background: "white",
            }}
          >
            <legend className="sr-only">
              Pilih level artist
            </legend>

            <label className="pk-label">
              PILIH LEVEL ARTIST
            </label>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: 12,
              }}
            >
              {artistLevels.map((level) => {
                const inputId = `${groupId}-${level.id}`

                return (
                  <label
                    key={level.id}
                    htmlFor={inputId}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      id={inputId}
                      name="artistLevel"
                      type="radio"
                      value={level.id}
                      checked={selectedLevel === level.id}
                      onChange={(event) => {
                        setSelectedLevel(event.target.value)
                        setError("")
                      }}
                    />

                    <span
  style={{
    fontSize: 16,
    color: "var(--text-dark)",
  }}
>
  {level.label}
</span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={() => setShowLevelInfo(true)}
            style={{
              marginTop: 12,
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: "var(--blue-primary)",
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            Lihat penjelasan level →
          </button>

          {error && (
            <div
              style={{
                background: "rgba(230,138,138,0.15)",
                border: "1px solid var(--red-salmon)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 14px",
                fontSize: 13,
                color: "#b03030",
                marginTop: 16,
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 24,
            }}
          >
            <button
              type="button"
              onClick={() => setCurrentPage("signupArtistBank")}
              className="pk-btn"
              style={{
                flex: 1,
                height: 52,
                border: "1.5px solid var(--blue-primary)",
                background: "white",
                color: "var(--blue-primary)",
                fontWeight: 700,
              }}
            >
              ← BACK
            </button>

            <button
              type="submit"
              className="pk-btn pk-btn-primary"
              style={{
                flex: 1,
                height: 52,
              }}
            >
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
);
}

export default SignupArtistLevelPage;
