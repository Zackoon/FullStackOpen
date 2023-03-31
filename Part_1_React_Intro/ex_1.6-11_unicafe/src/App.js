import {useState} from 'react';

const Header = ({header}) => <h1>{header}</h1>;

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>;

const Statistics = (props) => {
  const [goodText, neutralText, badText] = props.allFeedback;
  const [good, neutral, bad]= props.allCounts;
  const total = good + neutral + bad;
  
  if (total != 0) {
    return (
      <>
        <p>{goodText} {good}</p>
        <p>{neutralText} {neutral}</p>
        <p>{badText} {bad}</p>
        <p>all {total}</p>
        <p>average {(total)/3}</p>
        <p>positive {(good)/total}</p>
      </>
    )
  } else return <p>No feedback given.</p>
};

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  return (
    <div>
      <Header header="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />

      <Header header='statistics'/>
      <Statistics allFeedback={['good','neutral','bad']} allCounts={[good, neutral, bad]} />
    </div>
  )
};

export default App;
  