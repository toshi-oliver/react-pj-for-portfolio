import { useState, FormEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  ArrowLeftOnRectangleIcon,
  CakeIcon,
} from '@heroicons/react/24/solid'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { useMutateTask } from '../hooks/useMutateTask'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { TaskItem } from './TaskItem'


export const Todo = () => {
  const queryClient = useQueryClient()
  const [menuTitle, setMenuTitle] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useQueryTasks(page)
  const { createTaskMutation } = useMutateTask()
  const { logoutMutation } = useMutateAuth()

  const submitTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createTaskMutation.mutate(
      { menuTitle },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['tasks'])
          setMenuTitle('') // 作成後に入力フィールドをリセット
        },
      }
    )
  }

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber)
  }

  const logout = async () => {
    await logoutMutation.mutateAsync()
    queryClient.removeQueries(['tasks'])
  }

  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className="flex items-center my-3">
        <CakeIcon className="h-8 w-8 mr-3 text-indigo-500 cursor-pointer" />
        <span className="text-center text-3xl font-extrabold">
          Recipe Manager
        </span>
      </div>
      <ArrowLeftOnRectangleIcon
        onClick={logout}
        className="h-6 w-6 my-6 text-blue-500 cursor-pointer"
      />
      <form onSubmit={submitTaskHandler}>
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="料理名を入力してね"
          type="text"
          value={menuTitle}
          onChange={(e) => setMenuTitle(e.target.value)}
        />
        <button
          className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
          disabled={!menuTitle || createTaskMutation.isLoading}
        >
          {createTaskMutation.isLoading ? 'レシピを検索中...' : 'レシピを検索する'}
        </button>
      </form>
      {data && (
        <div className="w-full max-w-md my-4 p-3 flex justify-center">
          <span className="text-gray-700 font-semibold">
            Total Recipes: {data.totalCount}
          </span>
        </div>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : data?.tasks.length === 0 ? (
        <p>新しいレシピを追加してみましょう！</p>
      ) : (
        <ul className="my-5">
          {data?.tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              menuTitle={task.menuTitle}
              menuDetail={task.menuDetail}
            />
          ))}
        </ul>
      )}
      <div className="flex justify-center items-center my-5 space-x-2">
        {Array.from({ length: data?.lastPage || 1 }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`py-2 px-4 rounded ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
