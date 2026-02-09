import React, { useEffect, useRef, useState } from 'react';

// Type definitions
interface Player {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
}

interface Obstacle {
    x: number;
    y: number;
    width: number;
    height: number;
}

const App: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [player, setPlayer] = useState<Player>({ x: 50, y: 50, width: 20, height: 20, speed: 5 });
    const [obstacles, setObstacles] = useState<Obstacle[]>([]);
    const [level, setLevel] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (context) {
            const gameLoop = () => {
                // Clear the canvas
                context.clearRect(0, 0, canvas.width, canvas.height);
                // Render player
                context.fillStyle = 'blue';
                context.fillRect(player.x, player.y, player.width, player.height);
                // Render obstacles
                obstacles.forEach(obstacle => {
                    context.fillStyle = 'red';
                    context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
                });
                if (!gameOver) {
                    requestAnimationFrame(gameLoop);
                }
            };
            gameLoop();
        }
    }, [player, obstacles, gameOver]);
    
    useEffect(() => {
        // Initialize obstacles based on level
        const newObstacles = [
            { x: 100, y: 100, width: 50, height: 50 },
            { x: 200, y: 150, width: 50, height: 50 }
        ];
        setObstacles(newObstacles);
    }, [level]);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (!gameOver) {
            switch (event.key) {
                case 'ArrowUp':
                    setPlayer(prev => ({ ...prev, y: prev.y - prev.speed }));
                    break;
                case 'ArrowDown':
                    setPlayer(prev => ({ ...prev, y: prev.y + prev.speed }));
                    break;
                case 'ArrowLeft':
                    setPlayer(prev => ({ ...prev, x: prev.x - prev.speed }));
                    break;
                case 'ArrowRight':
                    setPlayer(prev => ({ ...prev, x: prev.x + prev.speed }));
                    break;
                default:
                    break;
            }
            checkCollision();
        }
    };

    const checkCollision = () => {
        for (const obstacle of obstacles) {
            if (
                player.x < obstacle.x + obstacle.width &&
                player.x + player.width > obstacle.x &&
                player.y < obstacle.y + obstacle.height &&
                player.y + player.height > obstacle.y
            ) {
                setGameOver(true);
                alert('Game Over!');
                break;
            }
        }
    };  

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [player, gameOver]);
    
    return (
        <div>
            <h1>Multi-Level Game</h1>
            <canvas ref={canvasRef} width={800} height={600} />
        </div>
    );
};

export default App;