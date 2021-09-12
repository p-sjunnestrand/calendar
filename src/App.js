import {useState, useEffect} from 'react';
import Calendar from './modules/calendar';
import Todo from './modules/todo';
import moment from 'moment';
import './css/style.css';
moment().format();


const App = () => {

  const [currentMoment, setCurrentMoment] = useState(moment());
  const [deadlines, setDeadlines] = useState([]);
  const [noScroll, setNoScroll] = useState(false);
  const [holidays, setHolidays] = useState();

  useEffect(() => {
    
    const yearMonth = currentMoment.format("YYYYMM");
    
    //Fetches deadlines of current displayed month from server.
    fetch(`https://sjunnestrand-calendar-server.herokuapp.com/${yearMonth}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      setDeadlines(data.sort((a, b) => {return a.day - b.day}))
    })
    const year = currentMoment.format('YYYY');
    const month = currentMoment.format('MM');

    //Fetches holidays for current displayed month.
    fetch(`https://sholiday.faboul.se/dagar/v2.1/${year}/${month}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data.dagar);
        setHolidays(data.dagar);
    });
  }, [currentMoment]);

  //Sets the current month to the current displayed month +1/-1.
  function addMonth(param){
    
    const newMoment = currentMoment.clone().add(param, "month");
    setCurrentMoment(newMoment);
  };
    
  //Posts new deadline to server.
  const addNewDeadline = (objParam, monthParam) => {
    
    fetch(`https://sjunnestrand-calendar-server.herokuapp.com/${monthParam}`, {
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
    fetch(`https://sjunnestrand-calendar-server.herokuapp.com/${task._id}`, {
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
      setDeadlines(newDeadlines.sort((a, b) => {return a.day - b.day;}));
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <main className={noScroll?"noScroll":null}>
      <Calendar currentMoment={currentMoment} holidays={holidays} deadlines={deadlines} addMonth={addMonth} addNewDeadline={addNewDeadline} changeScroll={changeScroll}/>
      <Todo deadlines={deadlines} moment={currentMoment} holidays={holidays} deleteTask={deleteTask}/>
    </main>
  )
}

export default App;
