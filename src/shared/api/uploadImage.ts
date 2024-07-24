'use server';

import { serverFetch } from 'shared/api/serverFetch';

interface ImageInfo {
  id: string;
  url: string;
  width: string;
  height: string;
}

export const uploadImage = async (formData: FormData) => {
  return serverFetch.POST<ImageInfo>('/image', { body: formData });
};
