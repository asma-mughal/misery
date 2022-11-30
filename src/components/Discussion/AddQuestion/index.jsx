import './index.css';
import React,{useState} from 'react'
import { useQuill } from 'react-quilljs';
import TagInput from './TagInput';
import 'quill/dist/quill.snow.css'; 
import { useNavigate  } from "react-router-dom";
const QuestionPage = () => {
 
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const navigate = useNavigate();

  const handleQuill = (value) => {
    setBody(value);
  };
  const handleSubmit = () =>{

  }
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

    console.log(value,"this is quill editor")
  return (
    <div className="add-question font-poppins">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <h3>Title</h3>
                <small>
                  Be specific and imagine you’re asking a question to another
                  person
                </small>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Body</h3>
                <small>
                  Include all the information someone would need to answer your
                  question
                </small>
                <div ref={quillRef} />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Categories</h3>
                <small>
                  Add tag to describe what your question is about
                </small>
                {/* <input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  data-role="tagsinput"
                  data-tag-trigger="Space"
                  type="text"
                  placeholder="e.g. (asp.net-mvc php react json)"
                /> */}

                <TagInput
                  value={tag}
                  onChange={setTag}
                  name="fruits"
                  placeHolder="press enter to add new tag"
                />

                {/* <ChipsArray /> */}
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleSubmit} style={{
        backgroundColor:'#FF4A51',
        justifyItems:'center',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        display:'flex',
        padding:'0.5rem',
        borderRadius:'3rem',   
    }} className="button">
          <text className={`font-poppins text-sm text-bold text-center text-white font-bold `}>
            Add Your Question</text>
        </button>
      </div>
    </div>
  )
}

export default QuestionPage
