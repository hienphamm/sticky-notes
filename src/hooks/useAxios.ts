import { AxiosResponse, Method } from "axios";
import { useEffect, useRef, useState } from "react";
import { httpClient } from "../../libs/http.client";

interface ReturnType<TResponse> {
  data: TResponse | null;
  error: any;
  loaded: boolean;
  cancel: () => void;
  onRefetch: () => void;
}

export interface AxiosPayload<TPayload = any, TParams = any> {
  url: string;
  method: Method;
  payload?: TPayload;
  params?: TParams;
}

function useAxios<TPayload, TResponse>(
  { url, method, payload, params }: AxiosPayload<TPayload>,
  ready: boolean = true,
): ReturnType<TResponse> {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const controllerRef = useRef(new AbortController());
  const cancel = (): void => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    if (ready ?? false) {
      void (async () => {
        try {
          const response: AxiosResponse<{
            data: TResponse;
          }> = await httpClient().request({
            data: {
              params: "tabs?filters[category][title][$eq]=reactjs",
            },
            signal: controllerRef.current.signal,
            method,
            url,
          });
          setData(response.data.data);
        } catch (error: any) {
          setError(error);
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [method, params, payload, refetch, url, ready]);

  const onRefetch = (): void => {
    setRefetch(!refetch);
  };

  return { cancel, data, error, loaded, onRefetch };
}

export default useAxios;
