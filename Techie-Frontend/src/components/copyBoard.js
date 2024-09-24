import React, { useState } from 'react';

const CopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyTextToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500); 
      })
      .catch((error) => {
        console.error('Error copying text to clipboard:', error);
      });
  };

  const handleCopyClick = () => {
    const textToCopy = 'https://localhost:3000'; 
    copyTextToClipboard(textToCopy);
  };

  return (
    <div>
      <button onClick={handleCopyClick}>
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
};

export default CopyToClipboard;
