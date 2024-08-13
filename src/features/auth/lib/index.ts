import { authContext } from 'features/auth';
import { useContext } from 'react';

export const useAuth = () => useContext(authContext);
