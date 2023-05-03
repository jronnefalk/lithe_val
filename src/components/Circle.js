import React from "react";
import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";

class Circle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      data: this.getData(0),
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.hp !== prevProps.hp) {
      this.startAnimation();
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ percent: 0 });
      this.startAnimation();
    }, 500); // wait for 500 milliseconds
  }

  startAnimation() {
    const percent = (this.props.hp / 90) * 100;
    this.setState({ percent, data: this.getData(percent) });
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData(percent) {
    let y;
    if (percent <= 100) {
      y = percent;
    } else {
      y = 100;
    }
    return [
      { x: 1, y },
      { x: 2, y: 100 - y },
      { x: 3, y: percent - 100 },
    ];
  }

  render() {
    return (
      <svg viewBox="0 0 400 400" width="30%" height="30%">
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          width={400}
          height={400}
          labels={() => null}
          data={[
            { x: 1, y: 100 },
            { x: 2, y: 0 },
          ]} // Gray background
          innerRadius={120}
          style={{
            data: {
              fill: "gray",
              stroke: "none",
            },
          }}
        />
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          width={400}
          height={400}
          data={this.state.data}
          innerRadius={120}
          cornerRadius={25}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                if (datum.x === 1 || datum.x === 2) {
                  return "#317773";
                } else {
                  return "blue";
                }
              },
            },
          }}
        />
        <VictoryAnimation duration={1000} data={this.state}>
          {(newProps) => {
            return (
              <VictoryLabel
                textAnchor="middle"
                verticalAnchor="middle"
                x={200}
                y={200}
                text={`${Math.round(newProps.percent)}%`}
                style={{ fontSize: 45 }}
              />
            );
          }}
        </VictoryAnimation>
      </svg>
    );
  }
}

export default Circle;
