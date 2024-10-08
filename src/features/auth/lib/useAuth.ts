import { useContext } from 'react';

import { authContext } from '../context';

export const useAuth = () => useContext(authContext);
