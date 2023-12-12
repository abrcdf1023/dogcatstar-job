const client = <D>(url: string) =>
  fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  }).then((res) => res.json() as D);

export default client;
