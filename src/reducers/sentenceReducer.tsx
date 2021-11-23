import { SentenceInfo } from '../components/wfd/WfdItem'
import { getFromLocal, listLastItem, saveToLocal } from '../util/util'

export type Action = {
  type: 'ADD_SENTENCE' | 'PRACTICE_SENTENCE' | 'DELETE_SENTENCE' | 'UPDATE_PRACTICED_TODAY'
  payload?: any
}

export const listInitialState: SentenceInfo[] = getFromLocal()

const updatePracticedToday = (state: SentenceInfo[]) => {
  const currentDate = new Date().toLocaleDateString()
  return state.map((item) => {
    item.practicedToday = listLastItem(item.practicedDate) === currentDate
    return item
  })
}

export const listReducer = (state: SentenceInfo[], action: Action) => {
  const currentDateTime = new Date()
  const currentDate = currentDateTime.toLocaleDateString()
  let sentenceIndex = -1
  let newState = [...state]
  let newSentenceInfo
  switch (action.type) {
    case 'ADD_SENTENCE':
      // eslint-disable-next-line no-case-declarations
      newSentenceInfo = {
        id: currentDateTime.toISOString(),
        sentence: action.payload,
        addTime: currentDateTime.toISOString(),
        practicedDate: [],
        practiceTimes: 0,
      }
      newState = [...state, newSentenceInfo]
      saveToLocal(newState)
      return [...state, newSentenceInfo]
    case 'DELETE_SENTENCE':
      sentenceIndex = state.findIndex((item) =>
        item.id == action.payload
      )
      newState = [...state]
      sentenceIndex != -1 && newState.splice(sentenceIndex, 1)
      saveToLocal(newState)
      return newState
    case 'PRACTICE_SENTENCE':
      sentenceIndex = state.findIndex((item) =>
        item.id == action.payload
      )
      if (sentenceIndex !== -1) {
        newSentenceInfo = { ...state[sentenceIndex] }
        if (currentDate !== listLastItem(newSentenceInfo.practicedDate)) {
          newState.splice(sentenceIndex, 1, {
            ...newSentenceInfo,
            practiceTimes: newSentenceInfo.practiceTimes + 1,
            practicedDate: [...newSentenceInfo.practicedDate, currentDate],
            practicedToday: true
          })
          saveToLocal(newState)
          return newState
        }
      }
      return state
    case  'UPDATE_PRACTICED_TODAY':
      return updatePracticedToday(state)
    default:
      return state
  }
}
