import axios from "axios";

export const fetchData = async (url) => {
  try {
    const res = await axios.get(url);
    return res && res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error(error));
  }
};
