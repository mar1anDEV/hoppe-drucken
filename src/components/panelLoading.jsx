import React from 'react'

function panelLoading() {
  return (
    <div className="PanelContainerMain" style={{ position: 'absolute', height: '100%', width: '100%', top: 0 }}>
                <div
                    className="panel-content"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        zIndex: 9999999999999,
                    }}>
                    <div className="panel panel-loader" style={{backgroundColor: 'brown', zIndex: '99999999999999999'}}>
                        <div className="form-group" style={{position: 'relative',  height: '100%'}}>
                        
              <div className="text-center" style={{position: 'absolute', top: '50%',bottom: '50%', left: '50%', right: '50%', height: 'auto'}}>
                <div className="banter-loader" >
                  <div className="banter-loader__box"></div>
                  <div className="banter-loader__box"></div>
                  <div className="banter-loader__box"></div>
                  <div className="banter-loader__box"></div>
                  <div className="banter-loader__box"></div>
                  <div className="banter-loader__box"></div>
                  <div className="banter-loader__box"></div>
                  <div className="banter-loader__box"></div>
                  <div className="banter-loader__box"></div>
                </div>
              </div>
            
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default panelLoading