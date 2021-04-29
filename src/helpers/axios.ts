import axios from 'axios';

const source = axios.CancelToken.source();
const axiosInstance = axios.create({
  baseURL: 'http://data.fixer.io/api',
  cancelToken: source.token,
});

export async function queryFixerAPI({ queryKey }: any) {
  const [, { url }] = queryKey;

  const { data } = await axiosInstance.get(url);

  data.cancel = () => {
    source.cancel('Request was cancelled');
  };

  return data;
}
