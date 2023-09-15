import axios from "axios";

export const fetchData = async (url) => {
  try {
    const res = await axios.get(url);
    return res && res.data;
  } catch (errors) {
    console.error(errors);
    return Promise.reject(new Error(errors));
  }
};
