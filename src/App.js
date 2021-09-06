import {useState, useEffect} from 'react';
// import Month from './modules/month';
// import Year from './modules/year';
// import DaysGrid from './modules/daysGrid';
// import CalendarView from './modules/calendarView';
import Calendar from './modules/calendar';
import Todo from './modules/todo';
// import DayView from './modules/dayView';
import moment from 'moment';
import './css/style.css';
moment().format();


const App = () => {
  
  // const test = moment().date(0);
  // console.log("test", test.toString());

  const [currentMoment, setCurrentMoment] = useState(moment());
  const [deadlines, setDeadlines] = useState([]);
  const [newItem, setNewItem] = useState();
  
  useEffect(() => {
    const month = currentMoment.format("YYYYMM");
    console.log(month);
    fetch(`http://localhost:4000/${month}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setDeadlines(data)
    })
  }, [newItem]);

  // console.log(typeof(currentMoment));

  //Sets the current month to the current displayed month +1/-1.
  function addMonth(param){
    
    const newMoment = currentMoment.clone().add(param, "month");
    setCurrentMoment(newMoment);
    }
    
    const addNewDeadline = (param) => {
      const currentMonth = param.date.format("YYYYMM");
      console.log(currentMonth);
      fetch(`http://localhost:4000/${currentMonth}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(param)
      })
      .then((response) => {
        if(!response.ok){
          throw new Error('Something went wrong when contacting the server');
        } else {
          return response.json();
        }
      })
      .then(data => {
        console.log(data.task);
        setNewItem(data)
      })
      
  }
    
  return (
    <section>
      <h1>Calendar</h1>
      <Calendar currentMoment={currentMoment} addMonth={addMonth} addNewDeadline={addNewDeadline}/>
      <Todo/>
      {/* <Year year={currentMoment}/>
      <Month month={currentMoment} addMonth={addMonth}/>
      <DaysGrid days={currentMoment}/> */}
    </section>
  )
}

export default App;
