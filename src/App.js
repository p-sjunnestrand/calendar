import {useState, useEffect} from 'react';
import Calendar from './modules/calendar';
import Todo from './modules/todo';
import moment from 'moment';
import './css/style.css';
moment().format();


const App = () => {
  
  // const test = moment().date(0);
  // console.log("test", test.toString());

  const [currentMoment, setCurrentMoment] = useState(moment());
  const [deadlines, setDeadlines] = useState([]);
  const [noScroll, setNoScroll] = useState(false);
  // const [holidays, setHolidays] = useState([]);
  
  useEffect(() => {
    const month = currentMoment.format("YYYYMM");
    // console.log(month);
    fetch(`http://localhost:4000/${month}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setDeadlines(data)
      // const year = currentMoment.format('YYYY');
      // const month = currentMoment.format('MM');
      // fetch(`http://sholiday.faboul.se/dagar/v2.1/${year}/${month}`)
      // .then(response => response.json())
      // .then(data => {
      //   console.log(data);
      //   setHolidays(data);
      // });
    })
  }, [currentMoment]);

  // useEffect(() => {
  //   // const year = currentMoment.format('YYYY');
  //   // const month = currentMoment.format('MM');
  //   // fetch(`http://sholiday.faboul.se/dagar/v2.1/${year}/${month}`)
  //   const month = currentMoment.format("YYYYMM");
  //   // console.log(month);
  //   fetch(`http://localhost:4000/${month}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     // setHolidays(data);
  //   }, []);
  // })
  // console.log(typeof(currentMoment));

  //Sets the current month to the current displayed month +1/-1.
  function addMonth(param){
    
    const newMoment = currentMoment.clone().add(param, "month");
    setCurrentMoment(newMoment);
  };
    
    
  const addNewDeadline = (objParam, monthParam) => {
    // const currentMonth = param.date.format("YYYYMM");
    // console.log(param);
    // console.log(currentMonth);
    fetch(`http://localhost:4000/${monthParam}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objParam)
    })
    .then((response) => {
      if(!response.ok){
        throw new Error('Something went wrong when contacting the server');
      } else {
        return response.json();
      }
    })
    .then(data => {
      console.log("new task", data);
      setDeadlines([...deadlines, data])
    })
    .catch(error => {
      console.log(error);
    })
  };
    
  const changeScroll = () => {
    setNoScroll(noScroll => !noScroll);
  }

  const deleteTask = (task) => {
    console.log(task);
    fetch(`http://localhost:4000/${task._id}`, {
      method: "DELETE",
    })
    .then((response) => {
      if(!response.ok){
        throw new Error('Something went wrong when contacting the server');
      } else {
        return response.json()
      }
    })
    .then(data => {
      const newDeadlines = deadlines.filter(item => item._id !== task._id);
      console.log(newDeadlines);
      setDeadlines(newDeadlines);
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <section className={noScroll?"noScroll":null}>
      <h1>Calendar</h1>
      <Calendar currentMoment={currentMoment} deadlines={deadlines} addMonth={addMonth} addNewDeadline={addNewDeadline} changeScroll={changeScroll}/>
      <Todo deadlines={deadlines} deleteTask={deleteTask}/>
    </section>
  )
}

export default App;
