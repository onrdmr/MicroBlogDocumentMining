import React, { useContext, useState } from 'react';
import { PieNameContext } from './PieNameContext';

const PieSelectBox = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [contextValue, updateContextValue] = useContext(PieNameContext);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    updateContextValue(event.target.value)
  };

  return (
    <div className="row-sm-4">
      <PieNameContext.Consumer>
        {value=> <h3>{value}</h3>}
      </PieNameContext.Consumer>
      <div>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Select an option</option>
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