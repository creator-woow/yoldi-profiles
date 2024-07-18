import { useContext } from 'react';

import { themeContext } from 'shared/context/theme';

export const useTheme = () => useContext(themeContext);
