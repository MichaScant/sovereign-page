import { useContext } from 'react';
import { MissingAppProviderError } from '../errors.js';
import { ThemeContext } from './context.js';

function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new MissingAppProviderError('No Theme was provided.');
  }

  return theme;
}

export { useTheme };
