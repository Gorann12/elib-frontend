export type PoredakSortiranja = "asc" | "desc";
export type SortiranjePo = "naslov" | "cena";

export const validirajPoredakSortiranja = (
  vrednost: any
): PoredakSortiranja => {
  return vrednost === "asc" || vrednost === "desc" ? vrednost : "asc";
};

export const validirajSortiranjePo = (vrednost: any): SortiranjePo => {
  return vrednost === "naslov" || vrednost === "cena" ? vrednost : "cena";
};
