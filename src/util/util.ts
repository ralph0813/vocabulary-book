import { SentenceInfo } from '../components/wfd/WfdItem'

export const saveToLocal = (sentenceInfoList: SentenceInfo[]) => {
  localStorage.setItem('sentence', JSON.stringify(sentenceInfoList))
}
export const getFromLocal = (): SentenceInfo[] => {
  return localStorage.getItem('sentence') ? JSON.parse(localStorage.getItem('sentence')!) : [] as SentenceInfo[]
}

export function listLastItem<T>(list: T[]) {
  return list[list.length - 1]
}
