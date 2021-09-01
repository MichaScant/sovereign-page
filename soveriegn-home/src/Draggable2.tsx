import type {DraggableSyntheticListeners, Translate} from '@dnd-kit/core';
import React, {forwardRef} from 'react';
import classNames from 'classnames';
import styles from './Draggable.module.css';
 
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
  identity? : number;
}

export const Draggable2 = forwardRef<HTMLDivElement, Props>(
  function Draggable(
    {
      axis,
      dragOverlay,
      dragging,
      handle,
      label,
      listeners,
      translate,
      identity,
      ...props
    },
    ref
  ) {

    var id = "draggable-item";
    return (
      <div
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
          data-cypress={"draggable-itemB" + identity}
          {...(handle ? {} : listeners)}
          tabIndex={handle ? -1 : undefined}
          className = "square_black"
        > 
          Drag
        </div>
        {label ? <label>{label}</label> : null}
      </div>
    );
  }
);


