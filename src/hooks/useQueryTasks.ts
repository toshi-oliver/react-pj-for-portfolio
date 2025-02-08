import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { TasksResponse } from '../types'
import { useError } from '../hooks/useError'

export const useQueryTasks = (page: number) => {
  const { switchErrorHandling } = useError()
  const getTasks = async () => {
    const { data } = await axios.get<TasksResponse>(
      `${process.env.REACT_APP_API_URL}/tasks/?page=${page}`,
      { withCredentials: true }
    )
    return data
  }
  return useQuery<TasksResponse, Error>({
    queryKey: ['tasks', page],
    queryFn: getTasks,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
}
