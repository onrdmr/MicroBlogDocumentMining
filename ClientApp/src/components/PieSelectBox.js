import React, { useContext, useState } from 'react';
import { PieNameContext } from './PieNameContext';

const PieSelectBox = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [name, setName] = useContext(PieNameContext);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setName(event.target.value)
  };

  return (
    <div className="row-sm-4">
      <h2>{name}</h2>
      <div>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="default">Select an option</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="unicode">Unicode</option>
          <option value="personal">Personal</option>
          <option value="language">Language</option>

        </select>
        {/* <p>listing {selectedOption}</p> */}
      </div>

    </div>

  );
};

export default PieSelectBox;