import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const Barcode = ({ value, displayText }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, {
        format: "CODE128", 
        lineColor: "#000000", 
        width: 4, 
        height: 50, 
        displayValue: displayText, 
        text:  value : '7189237198', 
        fontSize: 30,
        textPosition: 'top', 
        fontOptions: 'bold', 
        font: 'monospace', 
        textMargin: 5, 
        background: '#ffffff', 
      });
    }
  }, [value, displayText]);

  return (
    <svg ref={barcodeRef}></svg>
  );
};

export default Barcode;