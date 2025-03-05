import React from 'react'
import Panel from './Panel';

import HoppeBrandLogo from '../assets/media/logo_300x42.webp'
import BackgroundSection from '../assets/media/85126822_193643055372251_207363735470211072_n.jpg'
import '../css/SectionChild.css';
import '../css/style.css'

function Section() {
  
    
  return (
    <section className="section-child position-relative" style={{ height: '100%', width: '100%'}}>
      <div className="image-wrapper" style={{ height: '100%', width: '100%' }}>
        <img
          src={BackgroundSection}
          alt="Background Image"
          className="img-fluid" 
          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
          loading="eager"
        />
      </div>
      <div className="dark-overlay" style={{ height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)', position: 'absolute', top: 0 }}></div>

      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#E3010F', opacity: 0.9, zIndex: 99999, position: 'absolute', top: 0, padding: '20px 10px', width: '100%' }}>
        <div className="container-fluid" style={{ margin: '0 20px' }}>
          <div className="brand-logo" style={{ maxWidth: 'fit-content', padding: '10px' }}>
            <a href="drucken.html" style={{ height: 'fit-content' }}>
              <img
                src={HoppeBrandLogo}
                alt="Hoppe Brand Logo"
                className="img-fluid"
                loading="lazy"
                style={{ maxWidth: '100%' }}
              />
            </a>
          </div>
        </div>
      </nav>

    <Panel></Panel>



    </section>
  )
}

export default Section