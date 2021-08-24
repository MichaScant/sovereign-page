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

var currentTile = -1;

//var num_G = 0;
//var num_B = 2;

var count = 0;
/*
function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 0.5 : 1,
  };

  return (
    <div className = "drop" ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
*/
/*
function DragMain() {
  const [parent, setParent] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const draggable = (
    <Draggable id="draggable">
      drag
    </Draggable>
  );

  return (
    //<div className = "back">
      <DndContext onDragEnd={handleDragEnd}>
        {!parent ? draggable : false}
          <Droppable key = {"droppable"} id = {"droppable"} dragging = {isDragging}>
            {parent ? draggable : ''}
          </Droppable>
      </DndContext>
    //</div>
  );

  function handleDragEnd(event: DragEndEvent) {
    setParent(event.over ? !event.over.id : false);
    //if (event.over && event.over.id === 'droppable') {
      //setParent(true);
    //}
  }

}
*/


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


function DraggableItem2({handle}: DraggableProps) {
  const {isDragging, setNodeRef, listeners} = useDraggable({
    id: 'draggable-item',
  });
   return (
    <Draggable2
   // identity={num_B}
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

export function GridGame({modifiers,}: Props) {
  var test : any;
    const grid = buildGrid();
    const [parents, setParent] = useState<UniqueIdentifier[]>(Array(25).fill(null));
    const [parent2, setParent2] = useState<UniqueIdentifier | null>(null);
    const [isDragging, setIsDragging] = useState<boolean[]>(Array(25).fill(false));
    const [isDragging2, setIsDragging2] = useState(false);
    const draggable2 = <DraggableItem2 />;

    const draggableCheckers : any[] = [];
  
    for (var i = 0; i < 12; i++) {
      const draggable = <DraggableItem identifier = {'draggable-item'+(draggableCheckers.length)}/>;
      draggableCheckers.push(draggable);
    }

    var counter = -1;
    return (
      <div>
      <DndContext 
        modifiers = {
          parents.every((element: String | null) => element === null) ? undefined: parent2 === null ? undefined: modifiers
        }
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        > 
          <div className = "drop">  
              {parent2 === null ? draggable2 : null}
          </div>
          <div className = "grid">
            
            {grid.map((row: any[]) => { 
                return (
                  <div>
                    {row.map((tile:any) => {
                      var rowIndex = grid.indexOf(row);
                     
                      if (((Number(tile)%2 == 0 && rowIndex%2 ==0) || (Number(tile)%2 != 0 && rowIndex%2 !=0))) {
                        counter++;

                        if (parents[counter] === null && tile < 24){
                          parents[counter] = tile;
                        }

                        return (    
                          <div>
                            <Droppable_white key={tile} id={tile}>
                              {parents[counter] === null && tile < 24? draggableCheckers[counter]: null}
                              {parents.indexOf(tile) > -1 ? draggableCheckers[parents.indexOf(tile)]: ''}
                            </Droppable_white> 
                          </div>  
                        ); 
                      } else {
                        return (      
                          <div>
                             <Droppable_Green id={tile}>
                
                            </Droppable_Green> 
                          </div> 
                        ); 
                      }
                     })}
          
                  </div>
                );
            })}
            
             {/*draggable*/}
            {/*<DragMain/>*/}
            </div>
            
 
            
              <DragOverlay>
                  {isDragging.length != 0 ? <Draggable dragging dragOverlay /> : null}
              </DragOverlay>
              
 
        </DndContext> 
        </div>
    );

    function isValid(toGoPlace : number, currentPlace: number) {
      if (currentPlace + (8-1) == toGoPlace || currentPlace + (8+1) == toGoPlace) {
        return true;
      } else {
        return false;
      }
    }

    function handleDragStart({ active}: DragStartEvent) {
          let newArray = [...isDragging];
          let index = active.id
          var getIndex = Number(index.match(/\d+$/));
          newArray[getIndex] = true;
          setIsDragging(newArray);
          setIsDragging2(true);
    }

    function handleDragEnd(over: DragEndEvent) {
      for (var i = 0; i < isDragging.length; i++) {
        if (isDragging[i] == true && isValid(Number(over.over?.id), Number(parents[i]))) {
          let newArrayParent = [...parents];
          let newArrayDragging = [...isDragging];

          newArrayParent[i] = (over ? over.over?.id : null as any);
          setParent(newArrayParent);
          
          newArrayDragging[i] = false;
          setIsDragging(newArrayDragging);
          break;
        }
      }
    }

    function handleDragCancel(event : DragCancelEvent) {
      let newArray = [...isDragging];
        let index = event.active.id
        var getIndex = Number(index.match(/\d+$/));
        newArray[getIndex] = false;
        setIsDragging(newArray);
        
        setIsDragging2(false);
    }
    
}


export default GridGame;
//<Tile />  