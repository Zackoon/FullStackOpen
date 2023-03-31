import {useState} from 'react';

const Header = ({header}) => <h1>{header}</h1>;

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>;

const Stats = ({feedback, count}) => <p>{feedback} {count}</p>;

const AggStats = (props) => {
  console.log(props)
  const [good, neutral, bad]= props.all;
  const total = good + neutral + bad;
  return (
    <>
      <p>all {total}</p>
      <p>average {(total)/3}</p>
      <p>positive {(good)/total}</p>
    </>
  )
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
      <Stats feedback='good' count={good} />
      <Stats feedback='neutral' count={neutral} />
      <Stats feedback='bad' count={bad} />
      <AggStats all={[good, neutral, bad]} />
    </div>
  )
};

export default App;
  