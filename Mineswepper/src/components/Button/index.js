import React, { useState,useEffect } from 'react';
import './Button.css';

const Button = ({ onHover, decFlag, incFlag, flagCount, cellVal, cellStat,count, gameOver,victory }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [cellState, setCellState] = useState(cellStat);

    useEffect(() => {
        if (count === 71) {
            setCellState(0);
        }
    }, [count]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        onHover(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        onHover(false);
    };

    const handleOnClick = () => {
        if(cellVal === 9)
            gameOver();
        else{
            setCellState(1);
            count++;
            victory();
        }



    };

    const handleOnContextMenu = (event) => {
        event.preventDefault();
        if (cellState === 0 && (flagCount > 0)) {
            setCellState(2);
            decFlag();
        } else if (cellState === 2) {
            setCellState(0);
            incFlag();
        } else {
            if(cellState === 0 && flagCount === 0)
                setCellState(0);
        }
    };

    return (
        <div
            className={`Button ${isHovered ? 'Button-hovered' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleOnClick}
            onContextMenu={handleOnContextMenu}
        >
            {cellState === 1 ? (
                cellVal === 9 ? (
                    <span role="img" aria-label="bomb">
                        💣
                    </span>
                ) : (
                    cellVal
                )
            ) : (
                cellState === 2 && (
                    <span role="img" aria-label="flag">
                        🚩
                    </span>
                )
            )}
        </div>
    );
};

export default Button;
