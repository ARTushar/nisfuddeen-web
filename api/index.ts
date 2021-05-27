import useSWR from 'swr'

// const fetcher = (...args) => fetch(...args).then(res => res.json())

// const useUser = (id: string) => {
//   const { data, error} = useSWR(`/api/user/${id}`, fetcher);

//   return {
//     user: data,
//     isLoading: !error && !data,
//     isError: error
//   }
// }