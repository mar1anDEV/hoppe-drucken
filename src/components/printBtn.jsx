import React from 'react';
import styled from 'styled-components';


const PrintBtn = ({ onClick }) => {
  return (
    <StyledWrapper>
      
      <button className="printBtn" id="print-btn" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="19.891mm" height="16.326mm" version="1.1" viewBox="0 0 20.891 20.326">
          <rect id="printerBase" fill="#b3b3b3" strokeWidth="1.7654" y="4.6781" width="20.891" height="11.648" ry="1.7409" />
          <rect id="printTray" fill="#5c5c5c" strokeWidth="1.5301" transform="scale(1,-1)" x="4.895" y="-17.326" width="11.101" height="4.9271" rx={0} ry="1.5873" />
          <rect id="paper" fill="#f9f9f9" strokeWidth="2.6115" x="6.2798" width="8.3316" height="8.6515" rx={0} ry={0} />
          <rect id="paperHidder" fill="#b3b3b3" strokeWidth="2.0858" x="2.5181" y="4.6781" width="16.311" height="7.7206" rx={0} ry="2.4446" />
          <circle id="printButtonOne" fill="#ececec" strokeWidth="1.7654" cx="17.74" cy="6.024" r=".62176" />
          <circle id="printButtonTwo" fill="#ececec" strokeWidth="1.7654" cx="19.405" cy="6.024" r=".62176" />
        </svg>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Your styles remain the same */
  .printBtn {
    background-color: rgb(83, 142, 231);
    border-radius: 5px;
    border: none;
    padding: 2px 10px;
    color: white;
    cursor: pointer;
    z-index: 9999999;
    width: 7.5em;
    height: 5.1em;
  }
  
  .printBtn:hover {
    background-color: rgb(84, 152, 255);
    transform: scale(1.05);
    transition: background-color 0.15s;
  }
  
  .printBtn:active {
    background-color: rgb(59, 134, 247);
    transform: scale(0.98);
  }
  
  .printBtn:active #printButtonOne {
    fill: #7fff2a;
    transition: fill 0.3s ease-in-out;
  }
  
  .printBtn:active #printButtonTwo {
    fill: #ffff00;
    transition: fill 0.3s ease-in-out;
  }
  
  .printBtn:active #paper {
    transform: translateY(10.5px);
    transition: transform 0.35s steps(6, end);
  }
  
  .printBtn:not(active) #paper {
    transition: transform 0.2s ease-out;
  }
  
  .printBtn:hover svg {
    transform: scale(1.02);
  }
  
  .printBtn svg {
    transition: transform 0.2s ease-in-out;
    position: relative;
    top: 4px;
  }
`;

export default PrintBtn;