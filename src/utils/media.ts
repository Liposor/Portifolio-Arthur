export function asset(path: string) {
  return /^(https?:)?\/\//i.test(path)
    ? path
    : import.meta.env.BASE_URL + path.replace(/^\/+/, '')
}
