import { DataVariant } from "@/types";

interface UrlOptions {
  id?: string;
  dataVariant: DataVariant;
}

const useUrl = ({ id, dataVariant }: UrlOptions) => {
  if (id) {
    return process.env.NEXT_PUBLIC_BASE_URL + "/" + dataVariant + "/" + id;
  }
  return process.env.NEXT_PUBLIC_BASE_URL + "/" + dataVariant;
};

export default useUrl;
