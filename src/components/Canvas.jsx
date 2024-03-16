import React, { useState } from 'react'

export default function Canvas() {

    let [spots, setSpots] = useState([]);

    let handleNewSpot = (event) => {
        setSpots((prev) => {
            let arr = prev;
            arr.push({
                posX : event.clientX,
                posY : event.clientY,
            });
            return [...arr];
        });
    }
    
    let [redoStack, setRedoStack] = useState([]);

    let renderSpots = spots.map((item, index) => {
        return <div key={`${item.posX}${item.posY}${index}`} className='bg-orange-600 size-[50px] fixed rounded-full' 
        style={{top : item.posY, left : item.posX, transform : `translate(${-25}px, ${-25}px)`}}>
        </div>
    });

    let handleUndo = () => {
        if (spots.length == 0){
            alert(`No more undo actions available!`);
            return;
        }
        setSpots((prev) => {
            let arr = prev;
            let temp = arr.pop();
            setRedoStack((prev) => {
                let x = prev;
                x.push(temp);
                return [...x];
            })
            return [...arr];
        });
    }

    let handleRedo = () => {
        if (redoStack.length == 0){
            alert(`No more undo actions available!`);
            return;
        }
        setRedoStack((prev) => {
            let arr = prev;
            let temp = arr.pop();
            setSpots((prev) => {
                let x = prev;
                x.push(temp);
                return [...x];
            })
            return [...arr];
        });
    }

  return (
    <>
        <div className='bg-black flex justify-center items-center fixed w-full space-x-5 p-3 z-50'>
            <button className='px-4 py-2 border-2 border-orange-600 rounded-full hover:bg-orange-600 hover:text-black' onClick={handleUndo}>UNDO</button>
            <button className='px-4 py-2 border-2 border-orange-600 rounded-full hover:bg-orange-600 hover:text-black' onClick={handleRedo}>REDO</button>
        </div>
        <div className='h-dvh' onClick={handleNewSpot}>
            {renderSpots}
        </div>
    </>
  )
}
