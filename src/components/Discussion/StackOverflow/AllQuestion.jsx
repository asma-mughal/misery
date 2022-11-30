
import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./css/AllQuestions.css";
import ReactHtmlParser from "react-html-parser";
import { Link, useNavigate} from "react-router-dom";
import { questions } from "../../../constants/constants";
const AllQuestion = ({question,setQuestion}) => {
  const navigate = useNavigate();
 const handleClick = (i) =>{
  setQuestion(i)
console.log(i)
navigate("/view")
 }
  return (
    <div className="all-questions font-poppins">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
          
            </div>
            <div className="all-option">
              
            </div>
          
          </div>
        </div>
      <div className="question-answer">
        {questions.map((i)=>{
          return(<div>
              <div className="question-answer">
          <div  className=" text-black font-bold
          hover:underline
          "
          onClick={()=>handleClick(i)}
          >{i.title}</div>

          {/* <a href=>{data.title}</a> */}

          <div
            style={{
              maxWidth: "90%",
            }}
          >
            <div><p className="text-gray-500 text-sm">{i.Docs}</p></div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            
              <p
                style={{
                  margin: "10px 5px",
                  padding: "5px 10px",
                  backgroundColor: "#FF7176",
                  borderRadius: "3px",
                  
                }}
              >
               {i.category}
              </p>
           
          </div>
          <div className="author">
            <small>{i.timestamp} hrs</small>
            <div className="auth-details">
              <Avatar />
              <p>
              Abc
              </p>
            </div>
          </div>
        </div>
            </div>)
        })}
      </div>
      </div>
    </div>
  )
}

export default AllQuestion
