// App.js
import React, { useState, useEffect } from 'react';
import './App.scss';
import NumberDisplay from '../NumberDisplay';
import { generateCells, revealAllCells } from '../../utils';
import Button from '../Button';

const App = () => {
    const [cells, setCells] = useState(generateCells());
    const [isFaceHovered, setIsFaceHovered] = useState(false);
    const [flagCounter, setFlagCounter] = useState(10);
    const [counter, setCounter] = useState(0);
    const [time, setTime] = useState(0);
    const [restart, setRestart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
        let timer = null;
        if (!gameOver) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    }, [gameOver]);

    useEffect(() => {
        if (restart) {
            setCells(generateCells());
            setIsFaceHovered(false);
            setFlagCounter(10);
            setTime(0);
            setGameOver(false);
            setGameWon(false);
            setRestart(false);
        }
    }, [restart]);


    const handleButtonHover = (isHovered) => {
        setIsFaceHovered(isHovered);
    };

    const decrementFlag = () => {
        if (flagCounter > 0) {
            setFlagCounter((prevCount) => prevCount - 1);
        }
    };

    const incrementFlag = () => {
        setFlagCounter((prevCount) => prevCount + 1);
    };

    const handleGameOver = () => {
        setGameOver(true);
        const revealedCells = revealAllCells(cells);
        setCells(revealedCells);
    };

    const handleVictory = () => {
        if (counter === 71){
            setGameWon(true);
        }
    };

    const handleRestart = () => {
        setRestart(true);
    };


    const renderFaceEmoji = () => {
        if (gameWon) {
            return '😎';
        } else if (gameOver) {
            return '😭';
        } else if (isFaceHovered) {
            return '😮';
        } else {
            return '😁';
        }
    };

    const renderCells = () => {
        return cells.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
                <Button
                    key={`${rowIndex}-${colIndex}`}
                    onHover={handleButtonHover}
                    decFlag={decrementFlag}
                    incFlag={incrementFlag}
                    flagCount={flagCounter}
                    cellVal={cell.value}
                    cellStat={cell.state}
                    count={counter}
                    gameOver={handleGameOver}
                    victory={handleVictory}
                />
            ))
        );
    };

    return (
        <div className="App">
            <div className="Header">
                <NumberDisplay value={flagCounter} />
                <div className="Face" onClick={handleRestart}>
                    <span role="img" aria-label="face">
                        {renderFaceEmoji()}
                    </span>
                </div>
                <NumberDisplay value={time} />
            </div>
            <div className="Body">{renderCells()}</div>
        </div>
    );
};

export default App;
