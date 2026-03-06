export interface PoemLine {
  id: number;
  original: string;
  pinyin: string;
  translation: string;
  analysis: string; // The "Genius" annotation content
}

export interface PoemData {
  title: string;
  author: string;
  dynasty: string;
  introduction: string; // Background info about the poem
  lines: PoemLine[];
  themes: string[];
}

export interface SearchResult {
  title: string;
  author: string;
  snippet: string;
}

export type ViewState = 'HOME' | 'SEARCHING' | 'POEM_VIEW' | 'ERROR';
