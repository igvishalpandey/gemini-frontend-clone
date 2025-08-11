export interface Country {
  cca2: string;
  name: { common: string };
  idd: { root: string; suffixes: string[] };
  flags: { png: string };
}