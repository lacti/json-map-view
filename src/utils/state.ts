import { useState as useReactState } from "react";

export const viewStateStore = <S extends { [K in keyof S]: S[K] }>(
  initial: S | null,
  notify: (newState: Partial<S>) => void
) => <K extends keyof S>(
  key: K,
  generateNewValue: () => S[K]
): [S[K], ((newValue: S[K]) => void)] => {
  const [value, set] = useReactState<S[K]>(
    initial && initial[key] ? initial[key] : generateNewValue()
  );
  return [
    value,
    (newValue: S[K]) => {
      notify({ [key]: newValue } as any); // Please help!
      set(newValue);
    }
  ];
};
