import React, { useState, useRef } from 'react';
import { InformationalIcon } from '../icons';

const Tooltip = ({
  content,
  title,
}: {
  content?: JSX.Element | string;
  title: JSX.Element | string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);

  return (
    <div
      ref={targetRef}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <InformationalIcon />

      {isVisible && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '8px',
            color: '#fff',
            backgroundColor: '#333',
            borderRadius: '4px',
            zIndex: 1000,
            minWidth: 220,
          }}
        >
          <div className="flex flex-col gap-1">
            <span className="font-unbounded text-xs">{title}</span>
            <span className="text-xs">{content}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
