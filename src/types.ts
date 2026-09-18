export type Language = 'en' | 'my';

export type TabType = 'overview' | 'block1' | 'block2' | 'block3' | 'block4' | 'calculator';

export interface TranslationDictionary {
  [key: string]: string;
}
