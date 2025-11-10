import { useState } from 'react';
import ProjectSetup from './pages/ProjectSetup';
import ProposalBuilder from './pages/ProposalBuilder';

function App() {
  const [currentScreen, setCurrentScreen] = useState('setup'); // 'setup' or 'builder'

  return (
    <>
      {currentScreen === 'setup' && (
        <ProjectSetup onComplete={() => setCurrentScreen('builder')} />
      )}
      {currentScreen === 'builder' && (
        <ProposalBuilder onBack={() => setCurrentScreen('setup')} />
      )}
    </>
  );
}

export default App;
