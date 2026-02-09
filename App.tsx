import React, { useState } from 'react';

const App = () => {
    const [levelComplete, setLevelComplete] = useState(false);
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    
    const levels = [
        { theme: 'Meadow', config: { /* Meadow level config */ } },
        { theme: 'Forest', config: { /* Forest level config */ } },
        { theme: 'Sky Castle', config: { /* Sky Castle level config */ } }
    ];
    
    const nextLevel = () => {
        if (currentLevelIndex < levels.length - 1) {
            setCurrentLevelIndex(currentLevelIndex + 1);
            setLevelComplete(false);
        } else {
            console.log('No more levels!');
        }
    };

    return (
        <div>
            <h1>{levels[currentLevelIndex].theme} Level</h1>
            <button onClick={nextLevel}>Next Level</button>
        </div>
    );
};

export default App;