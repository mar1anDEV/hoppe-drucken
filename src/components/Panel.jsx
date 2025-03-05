import React from 'react'
import FormInput from './FormInput'
import FormOutput from './FormOutput'

function Panel() {
  return (
    <div className="PanelContainerMain" style={{ position: 'absolute', height: '100%', width: '100%', top: 0 }}>
                <FormInput></FormInput>
            </div>
  )
}

export default Panel