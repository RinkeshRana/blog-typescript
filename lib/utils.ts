export function slugify(text: string): string {
  return text
    .toString() // Convert to string
    .normalize("NFKD") // Normalize special characters
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Replace multiple dashes with a single dash
}

export const randomId = () => {
  return Math.random().toString(36).substr(2, 10);
};
