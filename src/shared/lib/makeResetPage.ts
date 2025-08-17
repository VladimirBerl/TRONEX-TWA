type ArrayKeys<T> = {
  [P in keyof T]-?: T[P] extends unknown[] ? P : never;
}[keyof T];

export const makeResetPage = <T extends { page: number; total: number }, K extends ArrayKeys<T>>(
  itemsKey: K,
  startPage: number = 1,
) => {
  return (state: T & { [P in K]: unknown[] }): void => {
    state.page = startPage;
    state.total = 0;
    state[itemsKey].length = 0;
  };
};
