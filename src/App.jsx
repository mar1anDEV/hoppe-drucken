import React, { useState, useEffect } from 'react';
import Loading from './components/loading';
import '/css/loading.css';
import '/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Section = React.lazy(() => import('/components/mainSection')); // Lazy load

if (typeof window !== 'undefined') {
  import('react-scan')
    .then(({ scan }) => {
      scan({
        enabled: false,
        log: true,
        animationSpeed: 'fast'
      });
    })
    .catch((error) => {
      console.warn("react-scan could not be loaded:", error);
    });
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main style={{ height: '100vh' }}>
      {isLoaded ? (
        <React.Suspense fallback={<Loading />}>
          <Section />
        </React.Suspense>
      ) : (
        <Loading />
      )}
    </main>
  );
}

export default App;

