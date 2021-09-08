import {useState, useEffect} from 'react';
import Calendar from './modules/calendar';
import Todo from './modules/todo';
import moment from 'moment';
// require('/max-mckinnon-c9OCWLka764-unsplash.jpg/');
import './css/style.css';
moment().format();


const App = () => {
  
  // const test = moment().date(0);
  // console.log("test", test.toString());

  const [currentMoment, setCurrentMoment] = useState(moment());
  const [deadlines, setDeadlines] = useState([]);
  const [noScroll, setNoScroll] = useState(false);
  
  //Fetches deadlines of current displayed month from server.
  useEffect(() => {
    const month = currentMoment.format("YYYYMM");
    // console.log(month);
    fetch(`http://localhost:4000/${month}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      setDeadlines(data)
    })
  }, [currentMoment]);

  //Sets the current month to the current displayed month +1/-1.
  function addMonth(param){
    
    const newMoment = currentMoment.clone().add(param, "month");
    setCurrentMoment(newMoment);
  };
    
  //Posts new deadline to server.
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
    //Sets new deadline to state.
    .then(data => {
      console.log("new task", data);
      setDeadlines([...deadlines, data])
    })
    .catch(error => {
      console.log(error);
    })
  };
    
  //Used to disable scrolling on body when full day info is displayed.
  const changeScroll = () => {
    setNoScroll(noScroll => !noScroll);
  }

  //Deletes deadline from server, filters the deleted item out of state and resets state.
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
    <main className={noScroll?"noScroll":null} style={{backgroundImage: "url(/max-mckinnon-c9OCWLka764-unsplash.jpg)"}}>
      {/* <h1>Calendar</h1> */}
      <Calendar currentMoment={currentMoment} deadlines={deadlines} addMonth={addMonth} addNewDeadline={addNewDeadline} changeScroll={changeScroll}/>
      <Todo deadlines={deadlines} moment={currentMoment} deleteTask={deleteTask}/>
    </main>
  )
}

export default App;
