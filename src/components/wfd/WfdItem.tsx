import * as React from 'react'
import { CheckCircleIcon } from '@heroicons/react/solid'

export type SentenceInfo = {
  id: string
  sentence: string
  addTime: string
  practiceTimes: number
  practicedDate: string[]
  practicedToday?: boolean
}

const WfdItem = (props: { item: SentenceInfo, dispatchDelSentence: (id: string) => void, dispatchPracSentence: (id: string) => void }): JSX.Element => {
  const {
    item,
    dispatchDelSentence,
    dispatchPracSentence
  } = props

  const handlePractice = () => {
    if (!item.practicedToday) {
      dispatchPracSentence(item.id)
    }
  }

  const handleDelete = () => {
    dispatchDelSentence(item.id)
  }

  const isPracticedToday = item.practicedDate[item.practicedDate.length - 1] === new Date().toLocaleDateString()

  return (
    <div className={`md:text-lg lg:text-2xl ${isPracticedToday ? 'text-gray-400' : 'text-gray-800'}`}>
      <div className="flex items-center space-x-2 justify-between" key={item.id}>
        <div className="flex items-start space-x-4">
          <CheckCircleIcon
            className={`flex-shrink-0 h-6 w-6 md:w-7 md:h-7 lg:w-8 lg:h-8 cursor-pointer ${isPracticedToday ? 'text-green-500' : 'text-gray-400'}`}
            onClick={handlePractice}
          />
          <div>{item.sentence}</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="border rounded w-12 py-1 bg-white text-center text-gray-800">{item.practiceTimes}</div>
          <div className="w-20">
            <div className="btn-secondary" onClick={handleDelete}>Delete</div>
          </div>
          {/*<div className="btn-primary" onClick={handlePractice}>Practice</div>*/}
        </div>
      </div>
    </div>
  )
}
export default WfdItem
