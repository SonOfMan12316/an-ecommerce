import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import { useEffect, useState } from 'react';
import { getUsername } from '../api/helper/helper';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

interface FetchData<T> {
  isLoading: boolean;
  apiData: T | null;
  error: any;
  status: number | null;
}

type FetchResult<T> = [FetchData<T>, React.Dispatch<React.SetStateAction<FetchData<T>>>];

const useFetch = <T>(query: string | null): FetchResult<T> => {
  const [getData, setData] = useState<FetchData<T>>({
    isLoading: false,
    apiData: null,
    error: null,
    status: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const { username } = !query ? await getUsername() : { username: '' };
        const { data, status } = !query
          ? await axios.get(`/api/user/${username}`)
          : await axios.get(`/api/${query}`);

        if (status === 201) {
          setData((prev) => ({ ...prev, isLoading: false }));
        }
        setData((prev) => ({ ...prev, status, apiData: data }));
      } catch (error) {
        const axiosError = error as AxiosError;
        const status = axiosError?.response?.status || null;
        setData((prev) => ({ ...prev, status, error, isLoading: false }));
      }
    };

    fetchData();
  }, [query]);

  return [getData, setData];
};

export default useFetch;
