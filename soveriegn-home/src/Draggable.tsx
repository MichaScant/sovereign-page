import type {DraggableSyntheticListeners, Translate, UniqueIdentifier} from '@dnd-kit/core';
import React, {forwardRef, useState} from 'react';
import classNames from 'classnames';
import styles from './Draggable.module.css';
import { useDerivedTransform } from '@dnd-kit/core/dist/components/DragOverlay/hooks';
import { Dimensions, TouchableHighlight, Text } from 'react-native';
 
/*
export function Draggable(props: any) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <button 
    ref={setNodeRef} 
    style={style} 
    {...listeners} 
    {...attributes} 
    className="button"
    aria-label="Draggable"
    data-cypress="draggable-item"
    >
      {props.children}
    </button>
  );
}
*/

export enum Axis {
  All,
  Vertical,
  Horizontal,
}

interface Props {
  axis?: Axis;
  dragOverlay?: boolean;
  dragging?: boolean;
  handle?: boolean;
  label?: string;
  listeners?: DraggableSyntheticListeners;
  style?: React.CSSProperties;
  translate?: Translate;
  identity?: number;

}

export function Properties(p : any, isDrag : any) {
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  setParent(p);
  setIsDragging(isDrag);
}

export const Draggable = forwardRef<HTMLDivElement, Props>(
  function Draggable(
    {
      identity,
      axis,
      dragOverlay,
      dragging,
      handle,
      label,
      listeners,
      translate,
      ...props
    },
    ref
  ) {

    
    return (
      <div
        className={classNames(
          styles.Draggable,
          dragOverlay && styles.dragOverlay,
          dragging && styles.dragging,
          handle && styles.handle
        )}
        style={
          {
            '--translate-x': `${translate?.x ?? 0}px`,
            '--translate-y': `${translate?.y ?? 0}px`,
          } as React.CSSProperties
        }
      >
        <div
          ref={ref}
          {...props}
          aria-label="Draggable"
          data-cypress={"draggable-item" + identity}
          {...(handle ? {} : listeners)}
          tabIndex={handle ? -1 : undefined}
          className = "square_red"
        > 
          Drag
        </div>
      
      </div>
    );
  }
);


