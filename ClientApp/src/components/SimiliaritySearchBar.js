import React from "react";
import './SearchBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const SimiliaritySearchBar = (props) => {
    const [searchVal, setSearchVal] = React.useState('');
    
    const handleInput = (e) => {
      setSearchVal(e.target.value);
    }
    
    const handleClearBtn = () => {
      setSearchVal('');
    }
  
  
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
        </div>
      </div>
    );
  }
  
  
  
export default SimiliaritySearchBar;