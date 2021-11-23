import * as React from 'react'
import { useState } from 'react'

const NewWord = (): JSX.Element => {
  const [wordInput, setWordInput] = useState<null | string>(null)
  return (
    <div className="flex space-x-1">
      <input
        className="rounded"
        type="text"
        onChange={(e) => {
          setWordInput(e.target.value)
        }}
      />
      <input
        className="rounded"
        type="text"
        onChange={(e) => {
          setWordInput(e.target.value)
        }}
      />
      <button
        type="button"
        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded
        shadow-sm text-white bg-blue-500 hover:bg-blue-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
      >
        Add
      </button>
    </div>
  )
}
export default NewWord
