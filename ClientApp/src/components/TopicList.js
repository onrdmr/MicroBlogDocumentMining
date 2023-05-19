import React, {useState, useEffect} from "react";
import Topic from "./Topic";

const TopicList = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

   

    const fetchData = async () => {
        try {
          // const response = await fetch('https://api.example.com/data');
          const jsonData = [
            { topicName: "this", documentCount: 15, percentage: 88 },
            { topicName: "is", documentCount:25, percentage: 78 },
            { topicName: "elon", documentCount:35, percentage: 78 },
            { topicName: "musk", documentCount:55, percentage: 68 },
            { topicName: "nyan", documentCount:45, percentage: 38 }
          ];
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    const renderSubset = (startIndex, endIndex) => 
    {
        console.log("render slice start finish", data.length, startIndex, endIndex);
        return data.slice(startIndex, endIndex).map((data) => <Topic documentCount={data.documentCount} topicName={data.topicName} percentTen={"p"+Math.round(data.percentage/10)}></Topic> )
    }

    return (
        <table>
        <tbody>
            {Array.from({ length: Math.round(data.length/5) }, (_, index) => (                
                <tr className="skills web">
                    {renderSubset(index, index+5)}
                </tr>
            ))}
        </tbody>
      </table>
    )
}

export default TopicList;