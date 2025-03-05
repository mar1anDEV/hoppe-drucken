import React, { useRef, useEffect, useState } from 'react';
import Qrcode from '../assets/media/470054098_2657370687791277_4904186533986617337_n.jpg';
import BarcodeLogo from '../assets/media/logo_300x42 - label.webp';
import '../css/druckenSection.css';
import PrintBtn from './printBtn';
import JsBarcode from 'jsbarcode';

const Barcode = ({ value, displayText, formatSN, artikelFormat }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, {
        format: "CODE128",
        lineColor: "#000000",
        width: 4,
        height: 50,
        displayValue: displayText,
        text: `${artikelFormat}-${formatSN}`,
        fontSize: 30,
        textPosition: 'top',
        fontOptions: 'bold',
        font: 'monospace',
        textMargin: 5,
        background: '#ffffff',
      });
    }
  }, [value, displayText, formatSN, artikelFormat]);

  return <svg ref={barcodeRef}></svg>;
};

function FormOutput({ formData, onBackToForm }) {
  
  const { artikelNummer, artikelFormat, snNummer, produktName, menge } = formData;
  
  
  const [generatedBarcodes, setGeneratedBarcodes] = useState([]);
  
  
  useEffect(() => {
    const barcodes = [];
    for (let i = 1; i <= menge; i++) {
      barcodes.push({
        id: i,
        label: `${snNummer}/${i}`
      });
    }
    setGeneratedBarcodes(barcodes);
  }, [menge, snNummer]);
  
 
  const [selectedBarcode, setSelectedBarcode] = useState(0);
  
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Drücken</title>
          <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
          <style>
            body {
              margin: 0;
              padding: 0;
            }
            .page-break {
              page-break-after: always;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .last-page {
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .main-print-section {
              width: 100%;
              background-color: red;
            }
            .barcode-panel {
              margin: 0 auto;
            }
            .sp-article {
              font-weight: bold;
              position: relative;
              top: 0;
              font-size: 16px;
              display: block;
              max-width: 290px !important;
              word-wrap: break-word; 
              overflow-wrap: break-word; 
              white-space: normal;
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="main-print-section">
            ${generatedBarcodes.map((item, index) => `
              <div class="${index < generatedBarcodes.length - 1 ? 'page-break' : 'last-page'}">
                <div class="barcode-panel" style="background-color: rgb(255, 255, 255); padding: 5px; transform: scale(3.2)">
                  <div class="barcode-row" style="width: 100%; display: flex;">
                    <div class="qrcode-image" style="height: 120px; margin: auto 0px;">
                      <img height="100%" alt="qr-code" src="public/assets/media/470054098_2657370687791277_4904186533986617337_n.jpg" style="margin: auto 0px;">
                    </div>
                    <div class="second-row" style="display: flex; flex-direction: column; width: 100%;">
                      <svg id="barcode-${index}" style="max-width: 100%;"></svg>
                      <div class="barcode-bottom-text" style="display: flex; justify-content: space-between; align-items: start; padding: 0px 10px;">
                        <p class="sp-article" id="sp-Article">${produktName || "Produktname"}</p>
                        <div>
                          <img loading="eager" alt="Brand" src="public/assets/media/logo_300x42 - label.webp" style="width: 120px;">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          
          <script>
            document.addEventListener('DOMContentLoaded', function() {
              // Generate barcodes after DOM is fully loaded
              ${generatedBarcodes.map((item, index) => `
                JsBarcode("#barcode-${index}", "${artikelNummer || "123456789123"}", {
                  format: "CODE128",
                  lineColor: "#000000",
                  width: 4,
                  height: 50,
                  displayValue: true,
                  text: "${artikelFormat || ""}-${item.label}",
                  fontSize: 30,
                  textPosition: 'top',
                  fontOptions: 'bold',
                  font: 'monospace',
                  textMargin: 5,
                  background: '#ffffff'
                });
              `).join('')}
            });
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    printWindow.addEventListener('afterprint', function() {
      printWindow.close();
    });
    
    // Removed window.print() here to prevent triggering the print dialog
    // setTimeout(function() {
    //   if (!printWindow.closed) {
    //     printWindow.close();
    //   }
    // }, 500);
  }
   
      
  
  
  const handleBack = () => {
    if (onBackToForm) {
      onBackToForm();
    }
  };
  
  
  const [showHelp, setShowHelp] = useState(false);
  
  const handleHelpButtonClick = () => {
    setShowHelp(!showHelp);
    
    alert("Hilfe zur Barcode-Generierung:\n\n" +
          "1. Sie können verschiedene Barcodes aus der Liste links auswählen.\n" +
          "2. Klicken Sie auf 'Druckdialog öffnen', um den aktuell angezeigten Barcode zu drucken.\n" +
          "3. Mit 'Zurück' gelangen Sie zum Eingabeformular.");
  };

  return (
    <div className="panel-switch" style={{ height: '700px', width: '100%', position: 'absolute', top: '10%', zIndex: '999999999', padding: '20px' }}>
      <div className="container-panel mx-auto" style={{ height: '100%', maxWidth: '900px', opacity: 1 }}>
        <div className="row h-100 relative" style={{ backgroundColor: '#E3010F' }}>
          
          <div className="col-md-4 py-3 overflow-auto" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
            <div id="list-example" className="list-group scrollable-list">
              {generatedBarcodes.map((item, index) => (
                <a 
                  key={item.id}
                  className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center bg-danger text-white ${index === selectedBarcode ? 'bg-danger text-white' : ''}`}
                  onClick={() => setSelectedBarcode(index)}
                >
                  <span>{item.label}</span>
                  <button className="btn btn-link p-0" aria-label="Print">
                    <svg fill="currentColor" stroke="currentColor" strokeWidth="1.5" height="30px" width="30px" viewBox="0 0 64 64"></svg>
                  </button>
                </a>
              ))}
            </div>
            
            
            <div 
              className="interact-buttons" 
              style={{ zIndex: 9999999999, position: 'absolute', top: '87%', marginLeft: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '10px', width: 'auto' }}
            >
              <button type="button" onClick={handleBack} id="back-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16" style={{ strokeWidth: 2 }}>
                  <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>
                </svg>
                <span>Zurück</span>
              </button>
              <button type="button" id="pop-up-help-page" onClick={handleHelpButtonClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-raised-hand" viewBox="0 0 16 16" style={{ strokeWidth: 2 }}>
                  <path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207"/>
                  <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                </svg>
                <span>Hilfe</span>
              </button>
            </div>
          </div>

          
          <div className="col-md-8 overflow-auto h-100" style={{ backgroundColor: 'rgb(102, 100, 102)' }}>
            <div className="full-height-item eachItem" style={{ height: '650px', display: 'flex', justifyContent: 'center' }}>
              <div className="print" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center', justifyContent: 'center' }}>
                <div className="panel-container-switch" style={{ backgroundColor: '#fff', padding: '5px', width: '100%' }}>
                  <div className="barcode-row" style={{ width: '100%', display: 'flex' }}>
                    <div className="qrcode-image" style={{ height: '120px', margin: 'auto 0' }}>
                      <img src={Qrcode} style={{ margin: 'auto 0' }} height="100%" alt="qr-code" />
                    </div>
                    <div className="second-row" style={{ display: 'flex', flexDirection: 'column',width: '100%'}}>
                      
                      <Barcode 
                        value={artikelNummer || "123456789123"} 
                        displayText={true}
                        formatSN={generatedBarcodes[selectedBarcode]?.label || snNummer}
                        artikelFormat={artikelFormat || ""}
                      />
                      <div className="barcode-bottom-text" style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 10px' }}>
                        <p className="sp-article" id="sp-Article">{produktName || "Produktname"}</p>
                        <div><img src={BarcodeLogo} loading="lazy" style={{ width: '120px' }} alt="Brand" /></div>
                      </div>
                    </div>
                  </div>
                </div>
                <PrintBtn onClick={handlePrint}></PrintBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormOutput;