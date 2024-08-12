'use server';

import { GET } from 'shared/api';

import { User } from '../model';

export const getUser = async (slug: string) => GET<User>(`/user/${slug}`);

export const getUsers = async () => GET<User[]>('/user');
