import diacritics from 'diacritics';
export const totalPage = (totalItems: number, limit: number) => {
  return Math.ceil(totalItems / limit);
};

export const formatDiacritics = (str: string) => {
  return diacritics.remove(str).replace(' ', '-');
};

export const formatRegex = (str: string) => {
  return new RegExp(formatDiacritics(str), 'i');
};
