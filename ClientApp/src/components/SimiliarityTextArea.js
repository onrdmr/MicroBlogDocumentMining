import React, {useState} from "react";
import "./SimiliarityTextArea.css"
import Logo from "./../logo_min.png"

const SimiliarityTextArea = (props) => {
    const [text, setText] = useState(props.text);

    const handleChange = (event) => {
        setText(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`
    }

    const twitterBirdStyle = {
        maxWidth:'100%',
        maxHeight:'100%'
      };

    return (
        <div className="row container m-2">
            <div className="col-sm-4">
                <img style={twitterBirdStyle} alt="twitter bird with bitcoin" src={Logo}></img>
            </div>

            <div className="col-sm-8">
                <div className="talkbubble mt-2 md-2">
                    <textarea className="form-control" value={text} onChange={handleChange} rows={1} style={{resize:'none', overflow:'hidden'}}/>

                </div>
            </div>

        </div>

    )
}

export default SimiliarityTextArea;
