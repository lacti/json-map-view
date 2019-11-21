export const reverse = <T>(values: T[]) => [...values].reverse();

export const unique = <T>(values?: T[]) => [...new Set(values || [])];
