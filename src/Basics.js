import { Component } from 'react';

const Button = ({ value, onUpdate }) => {
  return <button onClick={onUpdate}>Clicks: {value}</button>;
};

// Нам треба зробити щоб наші 2 кнопки були незалежні по стану, натискалась кожна і додавалася окремо
export class Basics extends Component {
  state = {
    clicksA: 0,
    clicksB: 0,
  };

  updateA = () => {
    this.setState(prevState => {
      return {
        clicksA: prevState.clicksA + 1,
      };
    });
  };

  updateB = () => {
    this.setState(prevState => {
      return {
        clicksB: prevState.clicksB + 1,
      };
    });
  };

  render() {
    const { clicksA, clicksB } = this.state;
    const total = clicksA + clicksB;
    return (
      <div>
        {clicksA > 0 && <p>A = {clicksA}</p>}
        {clicksB > 0 && <p>B = {clicksB}</p>}
        <p>Total = {total}</p>
        <Button value={clicksA} onUpdate={this.updateA} />
        <Button value={clicksB} onUpdate={this.updateB} />
      </div>
    );
  }
}
