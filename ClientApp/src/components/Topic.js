import React from "react";
import "./Topic.css"

const Topic = (props) => {
    return (
        <>
            <td className={ props.percentTen}><span>{props.topicName}</span></td>
            <span >{props.documentCount}</span> 
        </>

        
    )
};

export default Topic;