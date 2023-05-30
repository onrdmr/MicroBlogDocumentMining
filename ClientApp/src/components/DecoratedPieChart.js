import { useState, useEffect } from "react";
import React from "react";

import PieSelectBox from "./PieSelectBox";
import PieNameBox from "./PieNameBox";

import { PieNameContext } from "./PieNameContext";

import { PieChart } from "react-minimal-pie-chart";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const DecoratedPieChart = (props) => {
  const [show, setShow] = useState(false);

  const [pieChartData, setPieChartData] = useState(props.data)

  const [name, setName] = useState("default");
  const [statData, setStatData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [count, setCount] = useState(10)

    useEffect(() => {
      if(name === 'default') {
        setLoading(false)
        setPieChartData(props.data)
      } else {
        setLoading(true)
        if(show == true) {
          fetchData(count);
        }

      }
  }, [show, name, count]);

  async function fetchData(count) {
    const response = await fetch("http://localhost:50030/" + name + "/" + count, {mode: "cors"});
    const jsonData = await response.json();
    setLoading(false)
    console.log(jsonData.data.length);
    console.log(jsonData.data)
    
    let totalCount = 0
    
    if (Array.isArray(jsonData.data)) {
      jsonData.data.forEach((item) => {
        // Perform logic or side effects on each item
        totalCount += item.value
        console.log(item);
      });
    } else {
      console.log('jsonData.data is not an array.');
    }
    
    // jsonData.data.data.foreach((item)=>{totalCount += item.value})

    let pieChartData = []

    if (Array.isArray(jsonData.data)) {
      jsonData.data.forEach((item) => {
        pieChartData.push({'key': item.key, 'votes': item.value, 'percentage': Math.round((item.value / totalCount) * 100)})
        // Perform logic or side effects on each item
        
        console.log(item);
      });
    } else {
      console.log('jsonData.data is not an array.');
    }
    


    console.log(totalCount)
    
    // jsonData.data.data.foreach((item)=>{pieChartData.push({'key': item.key, 'votes': item.value, 'percentage': Math.round((item.value / totalCount) * 100)})})




    // for (let i = 0 ; i < jsonData.data.length ; i++) {
    //   pieChartData[i] = {'key': array[i].key, 'votes': array[i].value, 'percentage': Math.round((array[i].value / totalCount) * 100)}
    // }

    console.log(pieChartData)

    setPieChartData(pieChartData)
    // setStatData(jsonData.data.data)
  }

  let data = [];

  pieChartData.map((obj) => {
    var randomColor = "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });

    let insert = {
      color: randomColor,
      title: obj.key,
      value: obj.votes,
    };

    data.push(insert);
  });

  const renderRows = pieChartData.map((obj) => {
    return (
      <tr key={`group-${obj.key}`}>
        <td>{obj.key}</td>
        <td>{obj.votes}</td>
        <td>{obj.percentage >= 100 ? obj.percentage / 2 : obj.percentage}%</td>
      </tr>
    );
  });

  return (
    <div >
      <div className="inline-container">
        <div className="row">
          <PieNameContext.Provider value={[name, setName, count, setCount]}>
            <div className="row-sm-4">
              <PieNameBox></PieNameBox>
            </div>
            <div className="row-sm-4">
              <PieSelectBox onClick={(e) => setShow(false)}></PieSelectBox>
            </div>
          </PieNameContext.Provider>
        </div>
        {show ? <FaChevronDown onClick={(e) => setShow(!show)}/> : <FaChevronUp onClick={(e) => setShow(!show)}/>}
      </div>

      {show ? (loading? (<p><em>Loading...</em></p>) : (<>
          <div className="chart-container">
            <PieChart
              animate
              animationDuration={500}
              animationEasing="ease-out"
              center={[50, 50]}
              data={data}
              lengthAngle={360}
              lineWidth={30}
              paddingAngle={0}
              radius={50}
              rounded
              startAngle={0}
              viewBoxSize={[100, 100]}
              label={(data) => data.dataEntry.title}
              labelPosition={65}
              labelStyle={{
                fontSize: "5px",
                fontColor: "FFFFFA",
                fontWeight: "800",
              }}
            />
          </div>

          <div>
            <h1>{statData}</h1>
          </div>

          <table>
            <thead>
              <tr>
                <th>Value</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>{renderRows}</tbody>
          </table>
        </>) ) : null}


      

      <style jsx>{`
        .chart-container {
          height: 200px;
          margin-left: auto;
          margin-right: auto;
          width: 300px;
        }

        .inline-container {
          align-items: center;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }

        table {
          margin-left: auto;
          margin-right: auto;
          margin-top: 3em;
          table-layout: fixed;
          width: 90%;
        }
        table tr th {
          text-align: left;
          background: gray;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default DecoratedPieChart;
