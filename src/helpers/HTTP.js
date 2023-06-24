import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: "https://apiartgallery.vercel.app/api",
});

export const HTTP = async (method, endPoint, formData, token) => {
    try {
        const __f__ = formData? formData: {}
        const headers = token ? {
          Authorization: `Bearer token`,
          "Content-Type": "application/json",
        } : {};
        const { data } = await api[method.toLowerCase()](endPoint, __f__, { headers });
        return data;
    } catch (error) {
        toast.error(`${error?.response?.data?.message}`);
        return error;
    }
};

export const uploadImage = (e, setImage, setDisabled) => {
  setDisabled(true);
  const formData = new FormData();
  formData.append('image', e.target.files[0])
  HTTP('POST', '/upload', formData)
  .then(res=>{
      setDisabled(false);
      if(res.success){
          setImage(res.image?.secure_url);
      }
  })
  .catch(err=>{
      setDisabled(false);
  })
};
