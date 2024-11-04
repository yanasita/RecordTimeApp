import { useState } from 'react'
import './App.css'

const defaultTitle = "";
const defaultTime = 0;

function App() {
  // const [count, setCount] = useState(20)
  const [records, setRecords] = useState([]);
  const [titleText, setTitleText] = useState(defaultTitle);
  const [timeNum, setTimeNum] = useState(defaultTime);
  const [error, setError] = useState("");
  const [totalTime, setTotalTime] = useState(defaultTime);

  const addNewRecord = (textValue, numValue) =>{
    const newRecord = {
      title: textValue,
      time: numValue
    };

    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    
    const sum = updatedRecords.reduce((accumulator, current) => accumulator + parseInt(current.time), 0);
    setTotalTime(sum);
  };

  const onChangeTitle = (event) => {
    setTitleText(event.target.value)
  }
  const onChangeTime = (event) => {
    setTimeNum(parseInt(event.target.value))
  }

  const onClickAddRecord = (textValue, numValue) =>{
    if(textValue === "" || numValue <= 0) {
      setError("入力されていない項目があります");
      return;
    }
    setError("");
    addNewRecord(textValue, numValue);
    setTitleText(defaultTitle);
    setTimeNum(defaultTime);
  }

  return (
    <>
      <h1>学習記録一覧</h1>

      <div className="field">
        <p>学習内容</p>
        <input type="text" value={titleText} onChange={onChangeTitle}/>
      </div>

      <div className="field">
        <p>学習時間</p>
        <input type="number" value={timeNum} onChange={onChangeTime}/>
        <p>時間</p>
      </div>

      <div>
        <p>入力されている学習内容: {titleText}</p>
        <p>入力されている学習時間: {timeNum}</p>
      </div>

      <button onClick={() => {onClickAddRecord(titleText, timeNum)}}>登録</button>
      <p style={{ color: 'red' }}>{error}</p>
      <p>合計時間 {totalTime}/1000 (h)</p>
      {records.map((record) => {
        const { title, time } = record;
        return <p key={title}>{title} {time}時間</p>
      })}
    </>
  )
}



export default App
