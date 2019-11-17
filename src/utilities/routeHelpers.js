import { useLocation } from "react-router-dom";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function makeQueryParams(queryParams) {
  let paramString = "";
  if (queryParams) {
    paramString += "?";
    const params = queryParams.map(param => param.key + "=" + param.value);
    paramString += params.join("&");
  }
  return paramString;
}
