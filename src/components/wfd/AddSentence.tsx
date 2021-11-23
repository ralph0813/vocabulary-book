import * as React from 'react'

const AddSentence = (props: { dispatchAddSentence: (sentence: string) => void }): JSX.Element => {
  const [input, setInput] = React.useState<string>('')
  const { dispatchAddSentence } = props

  const handleAddSentence = () => {
    if (input) {
      dispatchAddSentence(input)
      setInput('')
    }
  }

  return (
    <div className="flex space-x-2 items-center">
      <input
        type="text"
        className="input-primary text-2xl text-gray-800"
        value={input}
        onChange={
          (e) => {
            setInput(e.target.value)
          }
        }
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleAddSentence()
          }
        }}
      />
      <div className="w-56">
        <div
          className="btn-primary h-full text-xl"
          onClick={handleAddSentence}
        >
          Add Sentence
        </div>
      </div>
    </div>
  )
}
export default AddSentence
