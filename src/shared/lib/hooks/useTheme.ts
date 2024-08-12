import { useContext } from 'react';

import { themeContext } from 'shared/context';

export const useTheme = () => useContext(themeContext);
