import * as React from 'react'
import { CubeTransparentIcon } from '@heroicons/react/outline'

import WfdItem, { SentenceInfo } from '../components/wfd/WfdItem'
import AddSentence from '../components/wfd/AddSentence'
import { listInitialState, listReducer } from '../reducers/sentenceReducer'
import PracticedItem from '../components/wfd/PracticedItem'

const WFD = (): JSX.Element => {
  const [sentenceInfoList, listDispatcher] = React.useReducer(listReducer, listInitialState)
  const total = sentenceInfoList?.length || 0

  const dispatchAddSentence = (sentence: string) => {
    listDispatcher({
      type: 'ADD_SENTENCE',
      payload: sentence,
    })
  }
  const dispatchDelSentence = (sentenceId: string) => {
    listDispatcher({
      type: 'DELETE_SENTENCE',
      payload: sentenceId,
    })
  }
  const dispatchPracSentence = (sentenceId: string) => {
    listDispatcher({
      type: 'PRACTICE_SENTENCE',
      payload: sentenceId,
    })
  }

  React.useEffect(() => {
    listDispatcher({ type: 'UPDATE_PRACTICED_TODAY' })
  }, [])

  const practicedTodayList = React.useMemo(() => {
    return sentenceInfoList.filter((item: SentenceInfo) => item.practicedToday)
  }, [sentenceInfoList])

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold text-gray-900">PTE Practice - WFD</div>
      </div>
      <div className="text-xl">{` 一共有: ${total} 句哦！今日已经练习: ${practicedTodayList.length} 句！`}</div>
      <div>
        <AddSentence dispatchAddSentence={dispatchAddSentence} />
      </div>

      <div className='border p-3 rounded shadow-sm'>
        <div className="text-xl pb-2 font-bold text-gray-800">今日已练习：</div>
        <div className="space-y-2">
          {practicedTodayList?.length !== 0 ? practicedTodayList.map((item) => (
            <PracticedItem
              item={item} key={item.id}
              dispatchDelSentence={dispatchDelSentence}
              dispatchPracSentence={dispatchPracSentence}
            />
          )) : (
            <div className="text-center py-10 bg-gray-50 rounded">
              <CubeTransparentIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No sentences.</h3>
              <p className="mt-1 text-sm text-gray-500">No sentence has been practiced today!</p>
            </div>
          )}
        </div>
      </div>
      <div className='border p-3 rounded shadow-sm'>
        <div className="text-xl pb-2 font-bold text-gray-800">所有句子：</div>
        <div className="space-y-2">
          {sentenceInfoList?.length !== 0 ? sentenceInfoList.map((item) => (
            <WfdItem
              item={item} key={item.id}
              dispatchDelSentence={dispatchDelSentence}
              dispatchPracSentence={dispatchPracSentence}
            />
          )) : (
            <div className="text-center py-10 bg-gray-50 rounded">
              <CubeTransparentIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No sentences.</h3>
              <p className="mt-1 text-sm text-gray-500">Add some sentences first.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default WFD
