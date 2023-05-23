import React, {useState} from "react";
import './SearchBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const SimiliaritySearchBar = (props) => {
    const [searchVal, setSearchVal] =useState('');
    const [selectedOption, setSelectedOption] = useState('');
    
    const handleInput = (e) => {
      setSearchVal(e.target.value);
    }
    
    const handleClearBtn = () => {
      setSearchVal('');
    }
    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
  
    return (
      <div className='container'>
        <div className='input-wrap'>
            <FontAwesomeIcon icon={faSearch} />
          
          <input 
            onChange={handleInput}
            value={searchVal}
            type="text" 
            name="product-search" 
            id="product-search" 
            placeholder="Search sentence"
          />
          <FontAwesomeIcon icon={faTimes} onClick={handleClearBtn} />
          <div className="m-2">
            <select value={selectedOption} onChange={handleSelectChange}>
              <option value="">Select an option</option>
              <option value="tf-idf">tf-idf</option>
              <option value="cosine-similiarity">Cosine Similiarity</option>
              <option value="jaccard distance">Jaccard Distance</option>

            </select>
            {/* <p>listing {selectedOption}</p> */}
          </div>
        </div>
      </div>
    );
  }
  
  
  
export default SimiliaritySearchBar;