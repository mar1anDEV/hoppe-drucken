import React, {useRef, useState} from 'react';
import '../css/style.css';
import FormOutput from './FormOutput';
import HoppeBrandLogo from '../assets/media/logo_300x42.webp';
import HofmeisterLogo from '../assets/media/hofmei-large.svg';
import FrickeLogo from '../assets/media/fricke_logo.BxfcmfTT.webp';
function FormInput({ onSetLoading}) {
    const inputSN = useRef(null);
    const inputProduktNamen = useRef(null);
    const inputMenge = useRef(null);
    const formRef = useRef(null);
    const inputArticle = useRef(null);
    const selectValue = useRef(null)
    const toolTip = useRef(null)

    
    const [showOutput, setShowOutput] = useState(false);
    const [formData, setFormData] = useState({
        artikelNummer: '',
        snNummer: '',
        produktName: '',
        menge: 1
    });

    const handleFormValues = (event) => {
        event.preventDefault();
        formatInputArticle();
        formatInputSN();
        
        
        let cleanArticleInput = inputArticle.current.value.replace(/\s+/g, '');
        
    

        setFormData({
            artikelNummer: cleanArticleInput,
            artikelFormat: inputArticle.current.value,
            snNummer: inputSN.current.value,
            produktName: inputProduktNamen.current.value,
            menge: parseInt(inputMenge.current.value, 10)
        });

        onSetLoading(true)
        
        setTimeout(() => {
            onSetLoading(false);  
            setShowOutput(true);     
        }, 300);

        
       
    };

    const copyValue = () => {
        inputArticle.current.select();
        const cleanFormatValue = inputArticle.current.value.replace(/\s+/g, '');
        const cleanCopyValue = cleanFormatValue;
        navigator.clipboard.writeText(cleanCopyValue);
    }

    const handleToolTip = () => {
        const cleanCopyValue = copyValue();
        
        
        toolTip.current.style.setProperty('--tooltip-text', "'Kopiert'");
        
        
         if (cleanCopyValue.length !== 12) {
            toolTip.current.style.setProperty('--tooltip-text', "'Kopieren'");
        
         }
        
    
    }

    const resetValues = () => {
        inputArticle.current.value = "";
        inputSN.current.value = "";
        inputProduktNamen.current.value = "";
        inputMenge.current.value = "1";
        
        
        setShowOutput(false);
    };
    
    const formatInputArticle = () => {
        let artikelSpaceValue = inputArticle.current.value.replace(/\D/g, '').substring(0, 12); 
        let artikelFormat = artikelSpaceValue.match(/.{1,4}/g)?.join(' ') || ''; 
        inputArticle.current.value = artikelFormat;
    };
    
    const formatInputSN = () => {
        let formatSN = inputSN.current.value.toUpperCase();

        if (formatSN.length > 6) {
            formatSN = formatSN.slice(0, 6);
        }
    
        inputSN.current.value = formatSN;
    };
    const handleBackToForm = () => {
        setShowOutput(false);
    };
    
    if (showOutput) {
        return <FormOutput 
            formData={formData} 
            onBackToForm={handleBackToForm} 
        />;
    }
    
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
                    zIndex: 9999,
                }}
            >
                <div className="panel">
                    <div className="panel-header">
                        <div className="panel-title">
                            <h3>
                                <strong>~ Barcode Generierung ~</strong>
                            </h3>
                        </div>
                    </div>
                    <div className="form-group">
                        <form id="submitForm" onSubmit={handleFormValues} ref={formRef}> 
                            <div className="form-container">
                                <div className="form-container-inputs">
                                    <div className="first-category-of-inputs">
                                        <div className="field-input artikel-input">
                                            <div className="text">
                                                <label htmlFor="inputArtikel">
                                                    <strong>
                                                        <em style={{ fontSize: '20px' }}>Artikelnummer</em>
                                                    </strong>
                                                    <span style={{ color: 'red' }}>*</span>
                                                </label>
                                            </div>
                                            <div className="relative-artikelnummer" style={{ position: 'relative' }}>
                                            
                                            <input
                                                    type="text"
                                                    ref={inputArticle}
                                                    onChange={formatInputArticle}
                                                    id="inputArtikel"
                                                    className="inputText inputNumber"
                                                    name="Artikelnummer"
                                                    autoComplete="off"
                                                    placeholder="z.B 5600 0001 1000"
                                                    required
                                                />
                                                <div className="icon-container" ref={toolTip} onClick={handleToolTip}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="copy-icon"
                                                        ref={selectValue}
                                                        onClick={copyValue}
                                                        viewBox="0 0 448 512"
                                                        id="copy-article"
                                                        style={{ height: '25px', width: '30px', fill: 'gray', cursor: 'pointer' }}
                                                    >
                                                        <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" />
                                                    </svg>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="field-input sn-input">
                                            <div className="text">
                                                <label htmlFor="inputSN">
                                                    <strong>
                                                        <em style={{ fontSize: '20px' }}>SN Nummer</em>
                                                    </strong>
                                                    <span style={{ color: 'red' }}>*</span>
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                id="inputSN"
                                                className="inputText sn-value"
                                                ref={inputSN}
                                                onChange={formatInputSN}
                                                name="SNnummer"
                                                autoComplete="off"
                                                placeholder="z.B SN223355"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="secondary-category-of-inputs">
                                        <div className="field-input namen-input">
                                            <div className="text">
                                                <label htmlFor="inputProduktNamen">
                                                    <strong>
                                                        <em style={{ fontSize: '20px' }}>Produktname</em>
                                                    </strong>
                                                    <span style={{ color: 'red' }}>*</span>
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                className="inputText inputProduktNamen"
                                                id="inputProduktNamen"
                                                name="Produktname"
                                                autoComplete="off"
                                                ref={inputProduktNamen}
                                                placeholder="z.B Hydrauliktank VAT-Alu 190L"
                                                required
                                            />
                                        </div>
                                        <div className="field-input menge-input" style={{ width: '100px' }}>
                                            <div className="text">
                                                <label htmlFor="inputMenge">
                                                    <strong>
                                                        <em style={{ fontSize: '20px' }}>Menge</em>
                                                    </strong>
                                                    <span style={{ color: 'red' }}>*</span>
                                                </label>
                                            </div>
                                            <input
                                                type="number"
                                                className="inputText form-control"
                                                id="inputMenge"
                                                ref={inputMenge}
                                                style={{fontSize: '20px'}}
                                                min="1"
                                                name="menge"
                                                max="300"
                                                defaultValue={1}
                                                step="1"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="buttons">
                                    <div className="container">
                                        <div className="abrechen-btn btn-box">
                                            <button
                                                type="button" 
                                                id="reset"
                                                onClick={resetValues}
                                                className="btn danger bg-white"
                                                style={{ fontSize: '20px' }}
                                            >
                                                Zurücksetzen
                                            </button>
                                        </div>
                                        <div className="bestätigen-btn btn-box">
                                            <button
                                                type="submit"
                                                id="confirm"
                                                className="btn succes bg-black text-white"
                                                style={{ fontSize: '20px' }}
                                            >
                                                Bestätigen
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="container-brands">
                        <div className="brands">
                            <div className="hoppe brand">
                                <a href="https://hoppe.parts/">
                                    <picture>
                                        <source srcSet={HoppeBrandLogo} type="image/webp" />
                                        <img src={HoppeBrandLogo} loading="lazy" style={{ width: '150px' }} />
                                    </picture>
                                </a>
                            </div>
                            <div className="hofmeister brand">
                                <a href="https://www.hofmeisterparts.de/">
                                    <picture>
                                        <source srcSet={HofmeisterLogo} type="image/webp" />
                                        <img src={HofmeisterLogo} loading="lazy" style={{ width: '200px' }} />
                                    </picture>
                                </a>
                            </div>
                            <div className="fricke brand">
                                <a href="https://www.fricke.de/">
                                    <picture>
                                        <source srcSet={FrickeLogo} type="image/webp" />
                                        <img src={FrickeLogo} loading="lazy" style={{ width: '120px' }} />
                                    </picture>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormInput;

