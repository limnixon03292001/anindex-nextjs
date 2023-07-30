const mainUrl = "https://api.jikan.moe/v4"

export const fetchTopAnime = async () => {
  const res = await fetch(mainUrl + '/top/anime', { cache: 'no-store' })
  return res.json()
}

export const fetchSeasonNow = async () => {
  const res = await fetch(mainUrl + '/seasons/now', { cache: 'no-store' })
  return res.json()
}

export const fetchSeasonUpcoming = async () => {
  const res = await fetch(mainUrl + '/seasons/upcoming', { cache: 'no-store' })
  return res.json()
}

export const fetchAnimeDetails = async (id: string) => {
  const res = await fetch(mainUrl + `/anime/${id}/full`, { cache: 'no-store' })
  return res.json()
}

export const fetchAnimeCharacters = async (id: string) => {
  const res = await fetch(mainUrl + `/anime/${id}/characters`, { cache: 'no-store' })
  return res.json()
}

export const fetchAnimeRecommendations = async (id: string) => {
  const res = await fetch(mainUrl + `/anime/${id}/recommendations`, { cache: 'no-store' })
  return res.json()
}
