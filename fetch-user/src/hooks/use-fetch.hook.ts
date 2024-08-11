import { useCallback, useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import http from "@/utils/http";

const useFetch = <D = unknown, E = unknown>(
  url: string,
  config?: AxiosRequestConfig<unknown>
): {
  data: D | null | undefined;
  error: E | null | undefined;
  loading: boolean;
  isError: boolean;
  isLoading: boolean;
  status: "loading" | "error" | "success";
  refresh: () => void;
} => {
  const [data, setData] = useState<D | undefined | null>(undefined);
  const [error, setError] = useState<E | undefined | null>(undefined);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(() => {
    const cashedData = localStorage.getItem(url);
    if (cashedData) {
      setData(JSON.parse(cashedData));
      setStatus("success");
      setError(null);
      setIsError(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    setStatus("loading");
    http
      .get<D>(url, config)
      .then((res) => {
        localStorage.setItem(url, JSON.stringify(res.data));
        setData(res.data);
        setStatus("success");
        setError(null);
        setIsError(false);
      })
      .catch((err) => {
        setData(null);
        setError(err);
        setStatus("error");
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [config, url]);

  useEffect(() => {
    fetchData();
    return () => {
      localStorage.removeItem(url);
    };
  }, [fetchData, url]);

  return {
    data: data as D | null | undefined,
    error: error as E | null | undefined,
    loading,
    isError,
    isLoading: loading,
    status: status as "loading" | "error" | "success",
    refresh: () => {
      localStorage.removeItem(url);
      fetchData();
    },
  };
};

export default useFetch;
