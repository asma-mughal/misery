import React from 'react'
import Sidebar from '../StackOverflow/Sidebar';
import './index.css';
import MainQuestion from './MainQuestion';
const ViewIndex = ({question,setQuestion}) => {
  return (
    <div className="stack-index">
    <div className="stack-index-content">
     <MainQuestion question={question} setQuestion={setQuestion} />
    </div>
  </div>
  )
}

export default ViewIndex
