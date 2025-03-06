import React, { useState } from 'react';
import FormInput from './FormInput';
import FormOutput from './FormOutput';
import PanelLoading from './panelLoading';

function Panel() {
  const [panelLoading, setPanelLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleLoading = (isLoading) => {
    setPanelLoading(isLoading);
  };

  const handleShowOutput = (show) => {
    setShowOutput(show);
  };

  return (
    <div className="PanelContainerMain" style={{ position: 'absolute', height: '100%', width: '100%', top: 0 }}>
      {panelLoading && <PanelLoading />}
      <FormInput 
        onSetLoading={handleLoading} 
        onSetShowOutput={handleShowOutput} 
      />
      {showOutput && <FormOutput />}
    </div>
  );
}

export default Panel;
