import { useFsm } from './fsm/useFsm';
import { useEffect } from 'react';
import { TRANSITIONS, fetchMachine } from './fetch.machine';

export default function App() {
  const [currentValue, transition] = useFsm(fetchMachine)

  useEffect(() => {
    console.log('oren started timeout.. current state is', currentValue);
    setTimeout(() => {
      console.log('oren finished timeout.. current state is', currentValue);
      transition(TRANSITIONS.TIMER)
    }, 5000)
  }, [])

  useEffect(() => {
    console.log('oren current value changed to', currentValue);
  }, [currentValue])


  return (
    <>
      <>Hello World {currentValue}</>
    </>
  );
}