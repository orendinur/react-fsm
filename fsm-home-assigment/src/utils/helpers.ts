import axios from "axios";

export const fetchData = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res && res.data;
  } catch (error: any) {
    console.log("oren fetchData error", error);
    if (axios.isAxiosError(error)) {
      console.error(`axios error: ${error.response?.data}`);
    } else {
      console.error(`error: ${error}`);
    }
    return Promise.reject(new Error(error));
  }
};
