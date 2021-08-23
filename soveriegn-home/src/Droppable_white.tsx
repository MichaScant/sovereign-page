import React from 'react';
import {useDroppable, UniqueIdentifier} from '@dnd-kit/core';
import { droppable } from './droppable-svg';
import classNames from 'classnames';
import "./GridGame.css";
import styles from "./Droppable.module.css";

type Value =  string | number | boolean | undefined | null;
type Mapping = { [key: string]: any };
type Argument = Value | Mapping | Argument[];
var tile = null;

interface Props {
  children: React.ReactNode;
  id: UniqueIdentifier;
}



export function Droppable_white({children, id}: Props) {
  const {isOver, setNodeRef} = useDroppable({
    id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };
  tile = id;
  return (
    <div 
    className={classNames(
      styles.Droppable_w,
      isOver && styles.over,
      children && styles.dropped
    )}
    ref={setNodeRef} 
    aria-label="Droppable region"
    >
      {children}
    </div>  
  );
}