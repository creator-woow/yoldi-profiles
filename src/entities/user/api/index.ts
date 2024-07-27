'use server';

import { serverFetch } from 'shared/api/serverFetch';

import { User } from '../model';

export const getUser = async (slug: string) =>
  serverFetch.GET<User>(`/user/${slug}`);

export const getUsers = async () => serverFetch.GET<User[]>('/user');
