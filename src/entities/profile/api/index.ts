import { Profile } from 'entities/profile';
import { ServerAPI } from 'shared/api/http';

export const getProfile = (slug: string) =>
  ServerAPI.GET<Profile>(`/user/${slug}`);

export const getProfilesList = () => ServerAPI.GET<Profile[]>('/user');
