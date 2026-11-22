/** Resolves a path from /public so it works on any GitHub Pages base URL. */
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
