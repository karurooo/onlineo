export const getToken = () => {
  if (process.client) {
    const token = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");

    return { token, userId };
  }
};
