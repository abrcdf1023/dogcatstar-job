const client = <D>(url: string, nextConfig?: NextFetchRequestConfig) =>
  fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
    next: nextConfig,
  }).then((res) => res.json() as D);

export default client;
