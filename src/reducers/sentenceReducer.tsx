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

function addSentence(state: SentenceInfo[], newSentence: string) {
  const currentDateTime = new Date()
  const currentISOTimeString = currentDateTime.toISOString()
  if (state.findIndex((item) => item.sentence === newSentence) === -1) {
    return [...state, {
      id: currentISOTimeString + '_' + state.length,
      sentence: newSentence,
      addTime: currentISOTimeString,
      practicedDate: [],
      practiceTimes: 0,
    }]
  } else {
    alert('Already Exists!')
    return state
  }
}

export const listReducer = (state: SentenceInfo[], action: Action) => {
  let sentenceIndex = -1
  let newState: SentenceInfo[]
  let newSentenceInfo
  switch (action.type) {
    case 'ADD_SENTENCE':
      newState = addSentence(state, action.payload)
      saveToLocal(newState)
      return newState
    case 'DELETE_SENTENCE':
      sentenceIndex = state.findIndex((item) =>
        item.id == action.payload
      )
      newState = [...state]
      sentenceIndex != -1 && newState.splice(sentenceIndex, 1)
      saveToLocal(newState)
      return newState
    case 'PRACTICE_SENTENCE':
      const currentDateTime = new Date()
      const currentDate = currentDateTime.toLocaleDateString()
      sentenceIndex = state.findIndex((item) =>
        item.id == action.payload
      )
      if (sentenceIndex !== -1) {
        newSentenceInfo = { ...state[sentenceIndex] }
        newState = [...state]
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
