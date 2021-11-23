import * as React from 'react'
import WFD from './WFD'

const MainPage = (): JSX.Element => (
  <div className="flex flex-col w-screen h-screen min-h-screen-ios mx-auto p-3 sm:p-8 md:p-12 lg:p-16">
    <div className='bg-gray-50 rounded-lg p-5 sm:p-8 md:p-12 lg:p-16'>
      <WFD />
    </div>
  </div>
)
export default MainPage
