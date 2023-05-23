import React, {useState} from "react"
import TopicList from "./TopicList";
const TopicComponent = () => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
      };
    
    return <>
        <div className="row">
            <h3>Topics in bitcoin tweets</h3>
            <div className="cols-sm-4 m-2">
                <select value={selectedOption} onChange={handleSelectChange}>
                <option value="">Select an option</option>
                <option value="tweet">tweet</option>
                <option value="user-description">user-description</option>
                </select>
                {/* <p>listing {selectedOption}</p> */}
            </div>

        </div>
        <div>
            <TopicList></TopicList>
        </div>
    </>

}

export default TopicComponent;