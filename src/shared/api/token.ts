export const getAccessTokenBearer = () => `Bearer ${localStorage.getItem("token") || ""}`;
