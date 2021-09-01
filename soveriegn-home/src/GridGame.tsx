import React, { PropsWithoutRef, useState } from 'react';
import "./GridGame.css";
import {
  DndContext, 
  useDraggable, 
  DragEndEvent, 
  CollisionDetection as CollisionDetectionType, 
  Modifiers, 
  UniqueIdentifier,
  DragOverlay,
  DragStartEvent,
  DragCancelEvent,
} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {Droppable_Green} from './Droppable_green';
import {Droppable_white} from './Droppable_white';
import {Draggable2} from './Draggable2';
import {} from './DraggableProperties';
import { timeline } from 'console';
interface Props {
  modifiers?: Modifiers;
  grid?: string[][];
}

var isTurnRed = true;
var isTurnBlack = false;

function buildGrid() {
  var grid: string[][] = [];
  var element = 1;
  for (let y = 1; y < 9; y++) {
    grid[y] = [];
    for (let x = 1; x < 9; x++) {
      grid[y][x] = String(element);
      element++;
    }
  }

  return grid;
}


interface DraggableProps {
  handle?: boolean;
  identifier? : String
}



function DraggableItem({handle, identifier}: DraggableProps) {
  const {isDragging, setNodeRef, listeners} = useDraggable({
    id: String(identifier),
  });
  
   return (
    <Draggable
      dragging={isDragging}
      ref={setNodeRef}
      handle={handle}
      listeners={listeners}
      style={{
        opacity: isDragging ? 0 : undefined,
      }}

    />
  );
}


function DraggableItem2({handle, identifier}: DraggableProps) {
  const {isDragging, setNodeRef, listeners} = useDraggable({
    id: String(identifier),
  });
   return (
    <Draggable2
      dragging={isDragging}
      ref={setNodeRef}
      handle={handle}
      listeners={listeners}
      style={{
        opacity: isDragging ? 0 : undefined,
      }}
      
    />
  );
}

function isCaptureValid(toGoPlace : number, currentPlace: number, id : String, redCircles: String[], blackCircles : String[], isKing : boolean) {
  if (currentPlace == toGoPlace) {
    return true;
  }
  
  if (redCircles.includes(String(currentPlace)) || blackCircles.includes(String(currentPlace))) {
    return false;
  } 

  if (isKing) {
    if (id === "black" && redCircles.includes(String(currentPlace - (8+1)))) {
      let result = isCaptureValid(toGoPlace, currentPlace - 2*(8+1), id, redCircles, blackCircles, isKing);
      if (result) {
        return true;
      }
    } if (id === "black" && (redCircles.includes(String(currentPlace - (8-1))))) {
      let result = isCaptureValid(toGoPlace, currentPlace - 2*(8-1), id, redCircles, blackCircles, isKing);
      if (result) {
        return true;
      }
    }
    
    if (id === "red" &&  blackCircles.includes(String(currentPlace + (8+1)))) {
      let result = isCaptureValid(toGoPlace, currentPlace + 2*(8+1), id, redCircles, blackCircles, isKing);
      if (result) {
        return true;
      }
    }

    if (id === "red" && (blackCircles.includes(String(currentPlace + (8-1))))) {
      let result = isCaptureValid(toGoPlace, currentPlace + 2*(8-1), id, redCircles, blackCircles, isKing);
      if (result) {
        return true;
      }
    }
  }

  if (id === "black" && (redCircles.includes(String(currentPlace + (8-1))))) {
    let result = isCaptureValid(toGoPlace, currentPlace + 2*(8-1), id, redCircles, blackCircles, isKing);
    if (result) {
      return true;
    }
  } 
  
  if (id === "black" && redCircles.includes(String(currentPlace + (8+1)))) {
    let result = isCaptureValid(toGoPlace, currentPlace + 2*(8+1), id, redCircles, blackCircles, isKing);
    if (result) {
      return true;
    }
  } 
  
  if (id === "red" && (blackCircles.includes(String(toGoPlace - (8-1))))) {
    let result = isCaptureValid(toGoPlace, currentPlace - 2*(8-1), id, redCircles, blackCircles, isKing);
    if (result) {
      return true;
    }
  } 
  
  if (id ==="red" && blackCircles.includes(String(toGoPlace - (8+1)))) {
    let result = isCaptureValid(toGoPlace, currentPlace - 2*(8+1), id, redCircles, blackCircles, isKing);
    if (result) {
      return true;
    }
  } else {
    return false;
  }
}

function isValid(toGoPlace : number, currentPlace: number, id : String, redCircles: String[], blackCircles : String[], isKing : boolean) {
  //checks if any pieces exist on the square the player wants to move to
  if (redCircles.includes(String(toGoPlace)) || blackCircles.includes(String(toGoPlace))) {
    return false;
  } 

  if (isKing) {
      //checks if a diagonal move is valid for a king piece
      if ((currentPlace - (8-1) == toGoPlace || currentPlace - (8+1) == toGoPlace || currentPlace + (8-1) == toGoPlace || currentPlace + (8+1) == toGoPlace)) {
        return true;
        //checks if move is valid for taking pieces for kings
      } else if (id === "black" && (redCircles.includes(String(toGoPlace - (8-1))) || redCircles.includes(String(toGoPlace - (8+1))))) {
        return true
      } else if (id === "red" && (blackCircles.includes(String(toGoPlace + (8-1))) || blackCircles.includes(String(toGoPlace + (8+1))))) {
        return true;
      }
  } 
  
  //checks if move is valid for taking pieces
  if ((currentPlace + (8-1) == toGoPlace || currentPlace + (8+1) == toGoPlace) && id === "red") {
    return true;
    //checks if move is valid for taking pieces
  } else if ((currentPlace - (8-1) == toGoPlace || currentPlace - (8+1) == toGoPlace) && id === "black") { 
    return true;
    //checks if move is valid for taking pieces
  } else if (id === "black" && (redCircles.includes(String(toGoPlace + (8-1))) || redCircles.includes(String(toGoPlace + (8+1))))) {
    return true;
    //checks if move is valid for taking pieces
  } else if (id === "red" && (blackCircles.includes(String(toGoPlace - (8-1))) || blackCircles.includes(String(toGoPlace - (8+1))))) {
    return true;
  } else {
    return false;
  }
}

export function GridGame({modifiers,}: Props) {
  var test : any;
    const grid = buildGrid();
    const [parents, setParent] = useState<UniqueIdentifier[]>(Array(12).fill(null));
    const [parent2, setParent2] = useState<UniqueIdentifier[]>(Array(12).fill(null));
    const [isDragging, setIsDragging] = useState<boolean[]>(Array(12).fill(false));
    const [isDragging2, setIsDragging2] = useState<boolean[]>(Array(12).fill(false));
    const [isKing, setIsKing] = useState<boolean[]>(Array(12).fill(false))
    const [isKing2, setIsKing2] = useState<boolean[]>(Array(12).fill(false))

    const draggableCheckersR : any[] = [];
  
    for (var i = 0; i < 12; i++) {
      const draggable = <DraggableItem identifier = {'draggable-itemR'+(draggableCheckersR.length)}/>;
      draggableCheckersR.push(draggable);
    }

    const draggableCheckersB : any[] = [];
  
    for (var i = 0; i < 12; i++) {
      const draggable = <DraggableItem2 identifier = {'draggable-itemB'+(draggableCheckersB.length)}/>;
      draggableCheckersB.push(draggable);
    }

    var counterR = -1;
    var counterG = -1;

    const gridSquares = grid.map((row: any[]) => {
          const rowSquares = row.map((tile:any) => {
            var rowIndex = grid.indexOf(row);
           
            if (((Number(tile)%2 == 0 && rowIndex%2 ==0) || (Number(tile)%2 != 0 && rowIndex%2 !=0))) {
              
              if (tile < 24){
                counterR++;
              }

              if (tile > 40){
                counterG++;
              }

              if (parents[counterR] === null && tile < 24){
                parents[counterR] = tile;
              }

              if (parent2[counterG] === null && tile > 40){
                parent2[counterG] = tile;
              }

              return (    
                <div>
                  <Droppable_white key={tile} id={tile}>
                    {parents[counterR] === null && tile < 24? draggableCheckersR[counterR]: null}
                    {parent2[counterG] === null && tile > 40? draggableCheckersB[counterG]: null}
                    {parent2.indexOf(tile) > -1 ? draggableCheckersB[parent2.indexOf(tile)]: ''}
                    {parents.indexOf(tile) > -1 ? draggableCheckersR[parents.indexOf(tile)]: ''}
                  </Droppable_white> 
                </div>  
              ); 
            } else {
              return (      
                <div>
                   <Droppable_Green key={tile} id={tile}>

                  </Droppable_Green> 
                </div> 
              ); 
            }
           });

        return (<div> {rowSquares} </div>);
          });

    return (
      <div>
      <DndContext 
        modifiers = {
          parents.every((element: String | null) => element === null) ? undefined: parent2.every((element: String | null) => element === null) ? undefined: modifiers
        }
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        > 
          <div className = "grid">
            
            {gridSquares}
          
            </div>
              <DragOverlay>
                  {isDragging2.includes(true) ? <Draggable2 dragging dragOverlay /> : null}
                  {isDragging.includes(true) ?  <Draggable dragging dragOverlay /> : null}
              </DragOverlay>
        </DndContext> 
        </div>
    );

    function handleDragStart({ active}: DragStartEvent  ) {
          if (active.id.includes("draggable-itemR") && isTurnRed){
            let newArray = [...isDragging];
            let index = active.id
            var getIndex = Number(index.match(/\d+$/));
            newArray[getIndex] = true;
            setIsDragging(newArray);
            isTurnRed = false;
            isTurnBlack = true;
          } else if (active.id.includes("draggable-itemB") && isTurnBlack) {
            let newArray = [...isDragging2];
            let index = active.id
            var getIndex = Number(index.match(/\d+$/));
            newArray[getIndex] = true;
            setIsDragging2(newArray);
            isTurnRed = true;
            isTurnBlack = false;
          }
    }

    function handleDragEnd(over: DragEndEvent) {
      for (var i = 0; i < isDragging.length; i++) {
        if (isDragging[i] == true) {
          if (isValid(Number(over.over?.id), Number(parents[i]), "red", parents, parent2, isKing[i])){
            let newArrayParent = [...parents];
            let newArrayDragging = [...isDragging];
            
            if ((isKing[i] === true) && (parent2.includes(String(Number(over.over?.id) - (9))) && parent2.includes(String(Number(parent2[i]) + (9)))) && String(Number(over.over?.id) - (9)) == String(Number(parent2[i]) + 9)) {
              let newArrayParent = [...parents];
              delete newArrayParent[parents.indexOf(String(Number(over.over?.id) - (8+1)))];
              setParent(newArrayParent);
            }

            if ((isKing[i] === true) && (parent2.includes(String(Number(over.over?.id) - (7))) && parent2.includes(String(Number(parents[i]) + (7)))) && String(Number(over.over?.id) - 7) == String(Number(parent2[i]) + 7)) {
              let newArrayParent = [...parents];
              delete newArrayParent[parents.indexOf(String(Number(over.over?.id) - (8-1)))];
              setParent(newArrayParent);
            }

            if (parent2.includes(String(Number(over.over?.id) - (8+1))) && parent2.includes(String(Number(parents[i]) + (9))) && String(Number(over.over?.id) - 9) == String(Number(parent2[i]) + 9)) {
              let newArrayParent2 = [...parent2];
              delete newArrayParent2[parent2.indexOf(String(Number(over.over?.id) - (8+1)))];
              setParent2(newArrayParent2);
            }

            if (parent2.includes(String(Number(over.over?.id) - (8-1))) && parent2.includes(String(Number(parents[i]) + (7))) && String(Number(over.over?.id) - 7) == String(Number(parent2[i]) + 7)) {
              let newArrayParent2 = [...parent2];
              delete newArrayParent2[parent2.indexOf(String(Number(over.over?.id) - (8-1)))];
              setParent2(newArrayParent2);
            }

            if (Number(parents[i])> 56) {
              let newIsKing = [...isKing];
              newIsKing[i] = true;
              setIsKing(newIsKing);
            }

            newArrayParent[i] = (over ? over.over?.id : null as any);
            setParent(newArrayParent);
            
            newArrayDragging[i] = false;
            setIsDragging(newArrayDragging);
            break;
          } else {
            let newArrayDragging = [...isDragging];
            newArrayDragging[i] = false;
            setIsDragging(newArrayDragging);
            isTurnRed = true;
            isTurnBlack = false;
          }
        } 
      }

      for (var i = 0; i < isDragging2.length; i++) {
        if (isDragging2[i] == true) {
          if (isValid(Number(over.over?.id), Number(parent2[i]), "black", parents, parent2, isKing2[i])) {
            let newArrayParent = [...parent2];
            let newArrayDragging = [...isDragging2];
                        
            if ((isKing2[i] === true) && (parents.includes(String(Number(over.over?.id) - (9))) && parents.includes(String(Number(parent2[i]) + (9)))) && String(Number(over.over?.id) - (9)) == String(Number(parent2[i]) + 9)) {
              let newArrayParent = [...parents];
              delete newArrayParent[parents.indexOf(String(Number(over.over?.id) - (8+1)))];
              setParent(newArrayParent);
            }

            if ((isKing2[i] === true) && (parents.includes(String(Number(over.over?.id) - (7))) && parents.includes(String(Number(parents[i]) + (7)))) && String(Number(over.over?.id) - 7) == String(Number(parent2[i]) + 7)) {
              let newArrayParent = [...parents];
              delete newArrayParent[parents.indexOf(String(Number(over.over?.id) - (8-1)))];
              setParent(newArrayParent);
            }
            
            if ((parents.includes(String(Number(over.over?.id) + (8+1)))) && parents.includes(String(Number(parent2[i]) - 9)) && String(Number(over.over?.id) + (8+1)) == String(Number(parent2[i]) - 9)) {
              let newArrayParent2 = [...parents];
              delete newArrayParent2[parents.indexOf(String(Number(over.over?.id) + (8+1)))];
              setParent(newArrayParent2);
            }

            if (parents.includes(String(Number(over.over?.id) + (8-1))) && parents.includes(String(Number(parent2[i]) - 7)) && String(Number(over.over?.id) + (8-1)) == String(Number(parent2[i]) - 7)) {
              let newArrayParent2 = [...parents];
              delete newArrayParent2[parents.indexOf(String(Number(over.over?.id) + (8-1)))];
              setParent(newArrayParent2);
            }

            if (Number(over.over?.id) <= 8) {
              let newIsKing = [...isKing2];
              newIsKing[i] = true;
              setIsKing2(newIsKing);
            }

            newArrayParent[i] = (over ? over.over?.id : null as any);
            setParent2(newArrayParent);
            
            newArrayDragging[i] = false;
            setIsDragging2(newArrayDragging);
            break;
          } else {
            let newArrayDragging = [...isDragging2];
            newArrayDragging[i] = false;
            setIsDragging2(newArrayDragging);
            isTurnRed = false;
            isTurnBlack = true;
          }
        }
      }
    }

    function handleDragCancel(event : DragCancelEvent) {
      if (event.active.id.includes("draggable-itemR")){
        let newArray = [...isDragging];
        let index = event.active.id
        var getIndex = Number(index.match(/\d+$/));
        newArray[getIndex] = false;
        setIsDragging(newArray);
        isTurnRed = true;
        isTurnBlack = false;
      } else {
        let newArray = [...isDragging2];
        let index = event.active.id
        var getIndex = Number(index.match(/\d+$/));
        newArray[getIndex] = false;
        setIsDragging2(newArray);
        isTurnRed = false;
        isTurnBlack = true;
      }
    }
    
}


export default GridGame;
//<Tile />  