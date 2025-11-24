export function isApiHashValid(apiHash: string) {
  return /^[a-z0-f]{32,32}$/.test(apiHash);
}
