import { compressAccurately } from 'image-conversion';

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    compressAccurately(file, 70).then((compressedFile: Blob) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(compressedFile);

      fileReader.onloadend = () => {
        resolve(fileReader.result as string);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  });
};
