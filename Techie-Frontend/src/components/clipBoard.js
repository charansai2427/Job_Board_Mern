// import React, { useState } from 'react'
// import { CopyToClipboard } from 'react-copy-to-clipboard';

// export default function clipBoard() {
//     const [inpValue, setInpValue] = useState('');
//     return (
//         <div className='clip'>
//             <input type="text" value={inpValue} onChange={e => setInpValue(e.target.value)}/>
//             <CopyToClipboard text={inpValue}>
//                 <button>Copy</button>
//             </CopyToClipboard>
//         </div>
//     )
// }


// import React, { useState } from 'react';

// const CopyToClipboard = () => {
//   const [copySuccess, setCopySuccess] = useState('');
//   const textToCopy = 'Text to be copied';

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(textToCopy);
//       setCopySuccess('Copied to clipboard!');
//     } catch (error) {
//       console.error('Failed to copy: ', error);
//       setCopySuccess('Copy failed. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <button onClick={copyToClipboard}>Copy to Clipboard</button>
//       <div>{copySuccess}</div>
//     </div>
//   );
// };

// export default CopyToClipboard;
