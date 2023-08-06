import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

const ToggleBox = () => {
  const [toggled, setToggled] = useState(false)
  function onHandleToggle () {
    setToggled(!toggled)
  }
  return (
    <div className='bg-white-900 w-96 h-full text-black flex'>
      <div className='w-full'>MainContent</div>
      <div className='w-0 relative'>
        <div
          className='absolute text-black z-50 left-0 top-1/2 translate-y-1/2 bg-white'
          onClick={onHandleToggle}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    </div>
  )
}

export default ToggleBox
