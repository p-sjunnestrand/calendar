import {useState} from 'react';
import Month from './modules/month';
import Year from './modules/year';
import DaysGrid from './modules/daysGrid';
import moment from 'moment';
import './css/style.css';
moment().format();


const App = () => {
  

  const [currentMoment, setCurrentMoment] = useState(moment());

  //Sets the current month to the current displayed month +1/-1.
  function addMonth(param){
    
    const newMoment = currentMoment.clone().add(param, "month");
    setCurrentMoment(newMoment);
    }
    

    
  return (
    <section>
      <h1>Calendar</h1>
      <Year year={currentMoment}/>
      <Month month={currentMoment} addMonth={addMonth}/>
      <DaysGrid days={currentMoment}/>
    </section>
  )
}

export default App;
