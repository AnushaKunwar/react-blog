module.exports = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
