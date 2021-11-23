import * as React from 'react'
import { CubeTransparentIcon } from '@heroicons/react/outline'

import WfdItem, { SentenceInfo } from '../components/wfd/WfdItem'
import AddSentence from '../components/wfd/AddSentence'
import { listInitialState, listReducer } from '../reducers/sentenceReducer'

const WFD = (): JSX.Element => {
  const [list, listDispatcher] = React.useReducer(listReducer, listInitialState)
  const total = list?.length || 0

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
    return list.filter((item: SentenceInfo) => item.practicedToday)
  }, [list])

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold">WFD</div>
      </div>
      <div className="text-xl">{` 一共有: ${total} 句哦！今日已经练习: ${practicedTodayList.length} 句！`}</div>
      <div>
        <AddSentence dispatchAddSentence={dispatchAddSentence} />
      </div>
      <div className="space-y-2">
        {list?.length !== 0 ? list.map((item) => (
          <WfdItem
            item={item} key={item.id}
            dispatchDelSentence={dispatchDelSentence}
            dispatchPracSentence={dispatchPracSentence}
          />
        )) : (
          <div className="text-center py-10 bg-gray-50 rounded">
            <CubeTransparentIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No sentences.</h3>
            <p className="mt-1 text-sm text-gray-500">No sentence need to be practiced!.</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default WFD
