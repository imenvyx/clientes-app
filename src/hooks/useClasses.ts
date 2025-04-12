import { useMemo } from 'react';
import { css } from '@emotion/css';
import { CSSObject } from '@mui/material';

/**
 * @param stylesElement CSSObject
 * @returns styles map
 */
const useClasses = (stylesElement: CSSObject) => {
  return useMemo(() => {
    const rawClasses = stylesElement;
    const prepared: any = {};

    Object.entries(rawClasses).forEach(([key, value = {}]) => {
      prepared[key] = css(value as string);
    });

    return prepared;
  }, [stylesElement]);
};

export default useClasses;
