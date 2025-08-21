export const setStatusCookie = (status: string) => {
  document.cookie = `status=${status}; path=/; max-age=${60 * 60 * 24}`;
};
