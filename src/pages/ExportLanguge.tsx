import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Languageservice } from 'services/languageServices';

export const ExportLanguge = () => {
  const [dataObject, setDataObject] = useState([]);
  const [length, setLength] = useState(0);
  const [input, setInput] = useState('');

  const handleLanguage = async () => {
    try {
      const response = await Languageservice(input);
      setLength(response.Data.length);
      setDataObject(response.Data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-screen'>
        <Helmet>
      <title>Export Language - WareHouse</title>
      </Helmet>
      <div className='mx-auto'>
        <input
          onChange={(e) => setInput(e.target.value)}
          type='text'
          value={input}
          className='mx-auto block w-full max-w-sm rounded-md border border-slate-300 p-2 text-sm font-medium leading-6 placeholder:italic focus:outline-red-500'
          placeholder='Nhập ngôn ngữ'
          maxLength={10}
        />
      </div>
<div className='w-full text-center mt-2'>

        <button onClick={handleLanguage} className='mx-auto text-center rounded-md p-3 bg-blue-600'>
          Xuất
        </button>
</div>

      <div className='mt-3 mx-5'> 
        {dataObject.map((obj) => (
          <div key={obj['ObjectName']}>
            "{obj['ObjectName']}":  "{obj['ObjectContent']}",
          </div>
        ))}


      </div>

    </div>
  );
};
