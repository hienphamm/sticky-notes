import { AxiosResponse } from "axios";

import { useCallback, useEffect, useState } from "react";

import { ResponseType } from "../models";

function useFetch<T>(
  api: () => Promise<AxiosResponse<ResponseType<T>>>,
): Array<boolean | T | undefined | (() => void)> {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    api()
      .then((result) => {
        const { status } = result;
        if (status === 200) {
          setData(result.data.data) as T;
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefetch = (): void => {
    setRefetch(!refetch);
  };

  return [loading, data, handleRefetch];
}

export default useFetch;
