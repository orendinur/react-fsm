import axios from "axios";

export const fetchData = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res && res.data;
  } catch (error: any) {
    console.error(error);
    return Promise.reject(new Error(error));
  }
};
