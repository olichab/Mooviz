import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader';

import "../scss/Spinners.scss"

export default function Spinner() {
  return (
    <div className='spinner'>
      <ScaleLoader
        sizeUnit={"px"}
        height={40}
        width={6}
        radius={20}
        margin={"5px"}
        color={'#a5a6de'}
        loading={true}
      />
    </div>
  )
}
