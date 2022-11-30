import React from "react";
import FilterListIcon from "@material-ui/icons/FilterList";
import "./css/Main.css";
import AllQuestion from "./AllQuestion";
import { Link } from "react-router-dom";
const Main = ({question,setQuestion}) => {
  return (
    <>
    <div className="main">
      <div className="main-container">
        <div className="main-top font-poppins">
          <h2>All Questions</h2>
          <Link to="/add">
            <button style={{
        backgroundColor:'#FF4A51',
        justifyItems:'center',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        display:'flex',
        padding:'0.5rem',
        borderRadius:'3rem',   
    }}><text className={`font-poppins text-sm text-bold text-center text-white font-bold `}>Ask Question</text></button>
          </Link>

          {/* <a href="/add-question"> */}

          {/* </a> */}
        </div>
        <div className="main-desc font-poppins">
          <p className="font-poppins">5 questions</p>
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab font-poppins">
                {/* <a href="/">Newest</a> */}
                <Link to="/">Newest</Link>
              </div>
              <div className="main-tab">
                <Link to="/">Active</Link>

                {/* <a href="/">Active</a> */}
              </div>
              <div className="main-tab">
                {/* <a href="/">More</a> */}
                <Link to="/">More</Link>
              </div>
            </div>
           
          </div>
        </div>
        <div className="questions">
          
            <div className="question">
              <AllQuestion question={question} setQuestion={setQuestion}  />
            </div>
         
        </div>
      </div>
    </div>
    </>
  )
}

export default Main
