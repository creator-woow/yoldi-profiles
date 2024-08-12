'use server';

import { POST } from './serverFetch';

interface ImageInfo {
  id: string;
  url: string;
  width: string;
  height: string;
}

export const uploadImage = async (formData: FormData) => {
  return POST<ImageInfo>('/image', { body: formData });
};
