export const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export const includesAllTokens = (source: string, target: string) => {
  const sourceTokens = new Set(normalizeText(source).split(" "));
  const targetTokens = normalizeText(target).split(" ");
  return targetTokens.every((token) => sourceTokens.has(token));
};
