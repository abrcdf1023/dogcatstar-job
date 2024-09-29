const BASE_URL = "https://api.themoviedb.org/3";

export const tmdbClient = <D>(url: string, nextConfig?: NextFetchRequestConfig) =>
  fetch(`${BASE_URL}${url}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
    next: nextConfig,
  }).then((res) => res.json() as D);
