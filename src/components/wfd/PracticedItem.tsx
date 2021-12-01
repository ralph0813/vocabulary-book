import * as React from 'react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { SentenceInfo } from './WfdItem'
import { listLastItem } from '../../util/util'

const PracticedItem = (props: { item: SentenceInfo, dispatchDelSentence: (id: string) => void, dispatchPracSentence: (id: string) => void }): JSX.Element => {
  const {
    item,
    dispatchDelSentence,
    dispatchPracSentence
  } = props
  // const [enlarge, setEnlarge] = React.useState(false)

  const handlePractice = () => {
    if (listLastItem(item.practicedDate) !== new Date().toLocaleDateString()) {
      dispatchPracSentence(item.id)
    }
  }

  const handleDelete = () => {
    dispatchDelSentence(item.id)
  }

  return (
    <div className={`md:text-lg lg:text-2xl text-gray-800`}>
      <div className="flex items-center space-x-2 justify-between" key={item.id}>
        <div className="flex items-start space-x-4">
          <CheckCircleIcon
            className={`flex-shrink-0 h-6 w-6 md:w-7 md:h-7 lg:w-8 lg:h-8 cursor-pointer text-green-500`}
            onClick={handlePractice}
          />
          <div>{item.sentence}</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="border rounded w-12 py-1 bg-white text-center text-gray-800">{item.practiceTimes}</div>
          <div className="w-20">
            <div className="btn-secondary" onClick={handleDelete}>Delete</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PracticedItem
