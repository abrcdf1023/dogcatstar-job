const client =  <D,>(url: string) => fetch(url, {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDI1ZmY3OTI3YjM4YjdjMTFmOTRhZTJiMDA2Y2YwYSIsInN1YiI6IjY1NmExOGIwZDQ2NTM3MDEzOTljYTgxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Md_bcsMtbyiqyqEjGe5uLrkdVer1B92JyYflcxKSl4k'
  }
}).then(res => res.json() as D)

export default client