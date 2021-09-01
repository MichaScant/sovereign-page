import type {DraggableSyntheticListeners, Translate} from '@dnd-kit/core';
import React, {forwardRef} from 'react';

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
          data-cypress={"draggable-itemR" + identity}
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


