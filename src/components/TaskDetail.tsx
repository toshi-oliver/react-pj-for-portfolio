import { useParams, useLocation, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export const TaskDetail = () => {
  useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const { menuTitle, menuDetail } = location.state

  const handleBack = () => {
    navigate(-1) // 前のページに戻る
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button
        onClick={handleBack}
        className="mb-4 flex items-center text-blue-500"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        戻る
      </button>
      <h1 className="text-3xl font-bold mb-4">料理名: {menuTitle}</h1>
      <h2 className="text-2xl font-semibold mb-2">レシピ:</h2>
      <div className="prose">
        <ReactMarkdown>{menuDetail}</ReactMarkdown>
      </div>
    </div>
  )
}