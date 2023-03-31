import {useState} from 'react';

const Header = ({header}) => <h1>{header}</h1>;

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = (props) => {
  const [good, neutral, bad]= props.allCounts;
  const numClicks = good + neutral + bad
  const total = good + neutral*0 + bad*-1;
  
  if (numClicks!= 0) {
    return (
      <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={numClicks} />
            <StatisticLine text="average" value={total/numClicks} />
            <StatisticLine text="positive" value={good/numClicks*100 + '%'} />
          </tbody>
      </table>
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
      <Statistics allCounts={[good, neutral, bad]} />
    </div>
  )
};

export default App;
  