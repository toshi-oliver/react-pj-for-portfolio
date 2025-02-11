import { FC, memo } from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'
import { Task } from '../types'
import { useMutateTask } from '../hooks/useMutateTask'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'


const TaskItemMemo: FC<Omit<Task, 'createdAt' | 'updatedAt'>> = ({
  id,
  menuTitle,
  menuDetail
}) => {
  const { deleteTaskMutation } = useMutateTask()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation()
    deleteTaskMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks'])
      },
    })
  }

  const handleClick = () => {
    navigate(`/task/${id}`, { state: { menuTitle, menuDetail } })
  }

  return (
    <li className="my-3 cursor-pointer" onClick={handleClick}>
      <span className="font-bold">{menuTitle}</span>
      <div className="flex float-right ml-20">
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </li>
  )
}
export const TaskItem = memo(TaskItemMemo)
