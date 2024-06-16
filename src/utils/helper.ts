import diacritics from 'diacritics';
import fs from 'fs';
import { format } from 'date-fns';
export const totalPage = (totalItems: number, limit: number) => {
  return Math.ceil(totalItems / limit);
};

export const formatDiacritics = (str: string) => {
  return diacritics.remove(str).replace(/\s+/g, '-').toLowerCase();
};

export const formatRegex = (str: string) => {
  return new RegExp(formatDiacritics(str).toLowerCase(), 'i');
};
export const formatDate = (str: string) => {
  return format(str, 'dd/MM/yyyy');
};
export const formatTime = (str: string) => {
  return format(str, 'dd/MM/yyyy HH:mm:ss');
};
export const deleteFile = async (path: string) => {
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('Tệp tin không tồn tại hoặc không thể truy cập.');
      return;
    }

    fs.unlink(path, (err) => {
      if (err) {
        console.error('Lỗi khi xóa tệp tin:', err);
        return;
      }
      console.log('Tệp tin đã được xóa thành công.');
    });
  });
};
