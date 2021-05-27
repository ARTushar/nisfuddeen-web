import useSWR from 'swr'
import axios from 'axios'

const fetcher =(url) =>  axios.get(url)

export const useCount = () => {
  const {data, error} = useSWR('https://jsonplaceholder.typicode.com/posts/1', fetcher);
  return {data, error}
}