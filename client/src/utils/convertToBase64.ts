import { compressAccurately } from 'image-conversion';

export const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const cfile: Blob = await compressAccurately(file, 70);
      const fileReader = new FileReader();

      fileReader.readAsDataURL(cfile);

      fileReader.onloadend = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    } catch (error) {
      reject(error);
    }
  });
};
