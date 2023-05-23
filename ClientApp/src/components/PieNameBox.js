import React,{useContext} from "react"
import { PieNameContext } from "./PieNameContext";

const PieNameBox = () => {

    const [name, _, count, setCount ] = useContext(PieNameContext);

    const handleCountChange = (event) => {
        setCount(parseInt(event.target.value))
    }

    return (
       <>
       <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3>Top</h3>
        <textarea defaultValue={count} onChange={handleCountChange} style={{ width: '3rem', height:'2rem', marginLeft: '10px' }} />
        <h3 style={{ marginLeft: '10px' }}>
          {name}
        </h3>
      </div>
       {/* <textarea>{count}</textarea> */}
       
       </> 
        // <PieNameContext.Consumer>
        //     {value=> <h3>{value}</h3>}
        // </PieNameContext.Consumer>
    )
}

export default PieNameBox;