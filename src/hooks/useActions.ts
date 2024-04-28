import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useUserData } from "./useUserData";
import toast from "react-hot-toast";
import { Method, DataVariant } from "@/types/types";
import useUrl from "./useUrl";

interface Options {
  method: Method;
  id?: string;
  dataVariant: DataVariant;
}

export const useActions = ({ method, id, dataVariant }: Options) => {
  const url = useUrl({ dataVariant, id });
  const { setCredentials, setNotes } = useUserData();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | {}>(null);
  const actions = async (data?: any) => {
    setLoading(true);
    if (method !== "GET") {
      toast.loading("loading");
    }

    try {
      const axiosConfig: AxiosRequestConfig = {
        method: method,
        url: url,
      };

      if (data) {
        axiosConfig.data = data;
      }
      let response = await axios(axiosConfig);

      console.log({ Response: response?.data?.data });
      if (dataVariant === "credentials") {
        setCredentials(response?.data?.data);
      }
      if (dataVariant === "notes") {
        setNotes(response?.data?.data);
      }

      if (method !== "GET") {
        toast.dismiss();
        toast.success(response?.data?.message);
      }
      setError(null);
    } catch (error: any) {
      if ((error as AxiosError).response) {
        const responseData = (error as AxiosError).response?.data;
        if (responseData && Object.keys(responseData).length === 0) {
          setError("An empty response was received");
        } else {
          setError(responseData || "An error occurred");
        }
      } else {
        setError(error.message || "An error occurred");
      }
      toast.dismiss();
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, actions };
};
