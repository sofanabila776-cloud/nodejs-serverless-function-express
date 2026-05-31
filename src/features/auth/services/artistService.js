const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getArtists = async () => {
  if (!API_BASE_URL) return null;
  const res = await fetch(`${API_BASE_URL}/artists`);
  return res.json();
};

export const getArtistById = async (id) => {
  if (!API_BASE_URL) return null;
  const res = await fetch(`${API_BASE_URL}/artists/${id}`);
  return res.json();
};