import { useState, useEffect } from "react";

//useRestApi (resusable custom hook to fetch postgres data)
export function useRestApiCall() {
  const [data, setData] = useState({});
  const [url, setUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    //axios
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await url;

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
}
