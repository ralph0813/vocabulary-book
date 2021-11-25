import * as React from 'react'
import WFD from './WFD'

const MainPage = (): JSX.Element => (
  <div className="min-h-screen-ios p-3 sm:p-8 md:p-12 lg:p-16 justify-center">
    <div className='bg-gray-50 rounded-lg p-5 sm:p-8 md:p-12 lg:p-16'>
      <WFD />
    </div>
  </div>
)
export default MainPage
