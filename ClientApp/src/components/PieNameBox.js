import React from "react"
import { PieNameContext } from "./PieNameContext";

const PieNameBox = () => {
    return (
        <PieNameContext.Consumer>
            {value=> <h3>{value}</h3>}
        </PieNameContext.Consumer>
    )
}

export default PieNameBox;