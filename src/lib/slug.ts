export function createUniqueSlug(value: string): string {
  const base = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const suffix = crypto.randomUUID().slice(0, 8);

  return `${base || "registro"}-${suffix}`;
}
