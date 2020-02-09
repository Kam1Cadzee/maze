import React, { useContext, useMemo, useState } from 'react';

export const ConfigContext = React.createContext({
  COUNT_STEPS: 10,
  COUNT_FIELDS: 3,
});

export const ProviderConfigContext = ({ children }: any) => {
  const [COUNT_FIELDS, setCOUNT_FIELDS] = useState(3);
  const [COUNT_STEPS, setCOUNT_STEPS] = useState(10);

  const FIELD_SIZE = useMemo(() => {
    const minWindowSize =
      window.innerWidth < window.innerHeight
        ? window.innerWidth
        : window.innerHeight;

    if (minWindowSize > 600) return (minWindowSize - 360) / COUNT_FIELDS;
    else return minWindowSize / COUNT_FIELDS;
  }, [COUNT_FIELDS]);

  const value = useMemo(
    () => ({
      COUNT_FIELDS,
      setCOUNT_FIELDS,
      COUNT_STEPS,
      setCOUNT_STEPS,
      FIELD_SIZE,
    }),
    [COUNT_STEPS, COUNT_FIELDS],
  );

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

export const useConfigContext = () => {
  const {
    COUNT_FIELDS,
    setCOUNT_FIELDS,
    COUNT_STEPS,
    setCOUNT_STEPS,
    FIELD_SIZE,
  }: any = useContext(ConfigContext);

  const splitNumber = (number: number) => {
    const row = Math.floor(number / COUNT_FIELDS);
    const column = number % COUNT_FIELDS;
    return {
      row,
      column,
    };
  };

  return {
    COUNT_FIELDS,
    setCOUNT_FIELDS,
    COUNT_STEPS,
    setCOUNT_STEPS,
    FIELD_SIZE,
    splitNumber,
  };
};
