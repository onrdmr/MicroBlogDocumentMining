import React, { Component } from 'react';
import DecoratedPieChart from './DecoratedPieChart';
import SimiliaritySearchBar from './SimiliaritySearchBar';
import SimiliarityTextArea from './SimiliarityTextArea';
// import TopicList from './TopicList';
import TopicComponent from './TopicComponent';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    const data = [
      { key: 'Red', votes: 300, percentage: 50 },
      { key: 'Blue', votes: 150, percentage: 30 },
      { key: 'Yellow', votes: 120, percentage: 20 },
    ];
    console.log("home rendered")

    return (
      <div className="container">
      <div className="row">
        <div className="col-sm-4 m-10">
          <DecoratedPieChart data={data}></DecoratedPieChart>
        </div>
        <div className="col-sm-8">
          <div className="row-sm-4 ">
          <div className="text-center">
            {/* Your text */}
            <h3>Similiar Document Analysis</h3>
          </div>
            <div>
              <SimiliaritySearchBar></SimiliaritySearchBar>
              <SimiliarityTextArea text={"Lorem ipsum dolor sit amet, consectetur adipadnwjkbwakjdbawıdıawdbgaıwudbuııııııııııııııııııııııııııııııııııııııııııııııııııiscing elit. Nulla tristique diam vel libero lobortis, in faucibus elit vulputate. Maecenas lacinia, sapien sit amet auctor pulvinar, nisl leo tincidunt nibh"}></SimiliarityTextArea>

            </div>
          </div>
          <div className="row-sm-4 mt-5">
            <TopicComponent></TopicComponent>
          </div>
        </div>
        
      </div>
    </div>
      
      // <div>
      //   <h1>Hello, world!</h1>
      //   <DecoratedPieChart data={data} ></DecoratedPieChart>
      //   <p>Welcome to your new single-page application, built with:</p>
      //   <ul>
      //     <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
      //     <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
      //     <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
      //   </ul>
      //   <p>To help you get started, we have also set up:</p>
      //   <ul>
      //     <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
      //     <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
      //     <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
      //   </ul>
      //   <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
      // </div>
    );
  }
}
