const axios = require("axios");

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export default axios.create({
  baseURL: BASE_URL,
});
