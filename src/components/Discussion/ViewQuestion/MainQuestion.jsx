import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import HistoryIcon from "@material-ui/icons/History";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 
import "./index.css";
import { asnweres } from "../../../constants/constants";
const MainQuestion = ({question,setQuestion}) => {
    let search = window.location.search;
    console.log(question)
  const params = new URLSearchParams(search);
  const id = params.get("q");
console.log(question)
  const [questionData, setQuestionData] = useState();
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const { quill, quillRef } = useQuill();
  const [value,setValue]=useState();

  React.useEffect(() => {
      if (quill) {
        quill.on('text-change', () => {
          console.log(quillRef.current.firstChild.innerHTML);
          setValue(quillRef.current.firstChild.innerHTML)
        });
      }
    }, [quill]);
  const handleSubmit = () =>{
    
  }
  const handleComment = () =>{
    
  }
  const [comment, setComment] = useState("");
  // const [comments, setComments] = useState([]);
  return (
    <div className="main font-poppins">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">{question.title} </h2>
          <Link to="/add">
            <button className="bg-secondary p-2 rounded-xl">

            <text className={`font-poppins text-sm text-bold text-center text-white font-bold `}>
            Add Your Question</text>
            </button>
          </Link>
        </div>
        <div className="main-desc">
          <div className="info">
            <p>
              Viewed<span>43times</span>
            </p>
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">▲</p>

                <p className="arrow">0</p>

                <p className="arrow">▼</p>

                <BookmarkIcon />

                <HistoryIcon />
              </div>
            </div>
            <div className="question-answer">
              
              <p>{question.Docs}</p>
              <div className="author">
                <small>
                  asked TimeStamp
                </small>
                <div className="auth-details">
                  <Avatar  />
                  <p>
                    abc
                  </p>
                </div>
              </div>
              <div className="comments">
                <div className="comment">
                  comments
                </div>
                <p onClick={() => setShow(!show)}>Add a comment</p>
                {show && (
                  <div className="title">
                    <textarea
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Add your comment..."
                      rows={5}
                    />
                    <button
                      onClick={handleComment}
                      style={{
                        maxWidth: "fit-content",
                      }}
                    >
                      Add comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            flexDirection: "column",
          }}
          className="all-questions"
        >
          <p
            style={{
              marginBottom: "20px",
              fontSize: "1.3rem",
              fontWeight: "300",
            }}
          >
             Answers
          </p>
        
             {asnweres.map((i)=>{
              return ( <div
                style={{
                  borderBottom: "1px solid #eee",
                }}
                className="all-questions-container"
              >
                <div className="all-questions-left">
                  <div className="all-options">
                    <p className="arrow">▲</p>

                    <p className="arrow">0</p>

                    <p className="arrow">▼</p>

                    <BookmarkIcon />

                    <HistoryIcon />
                  </div>
                </div>
                <div className="question-answer">
                {i.Detail}
                  <div className="author">
                    <small>
                      asked
                    </small>
                    <div className="auth-details">
                      <Avatar />
                      <p>
                       "Natalia lee"
                      </p>
                    </div>
                  </div>
                </div>
              </div>)
             })}
           
        </div>
     
      </div>
      <div className="main-answer">
        <h3
          style={{
            fontSize: "22px",
            margin: "10px 0",
            fontWeight: "400",
          }}
        >
          Your Answer
        </h3>
        <div ref={quillRef} />
      </div>
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "10rem",
          maxWidth: "fit-content",
          backgroundColor:"#FF4A51",
          padding:'8px',
          borderRadius:'19px',
          color:'white',
          
        }}
      >
        Post your answer
      </button>
    </div>
  )
}

export default MainQuestion
