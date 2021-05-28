import { Statistic, Row, Col } from 'antd';



const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

function onFinish() {
  console.log('finished!');
}

function onChange(val) {
  if (4.95 * 1000 < val && val < 5 * 1000) {
    console.log('changed!');
  }
}

ReactDOM.render(
      <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
);