import { connectApi } from "@/api/connetctApi";

export const Teste = () => {
  console.log("caiu aaqui");
  return connectApi.get("characters");
};
