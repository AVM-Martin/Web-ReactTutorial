import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/


// class Square extends React.Component {
//  render() {
//    return (
//      <button
//        className="square"
//        onClick={() => this.props.onClick()}
//      >
//        {this.props.value}
//      </button>
//    );
//  }
// }

function Square(props) {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function ToggleButton(props){
  return (
    <div>
      <button onClick={props.onClick}>
        {props.value}
      </button>
    </div>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        className={this.props.highlight[i]===true
          ? "square square-highlight"
          : "square"
        }
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const SIZE = 3;
    const RANGE = [...Array(SIZE).keys()];

    return (
      <div>
        {RANGE.map((row_number) => {
          return (
            <div className="board-row" key={row_number}>
              {RANGE.map((col_number) => {
                return this.renderSquare(SIZE*row_number + col_number);
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        highlight: Array(9).fill(false),
      }],
      isAscendingOrder: true,
      stepNumber: 0,
      xIsNext: true,
    };
  }

  getPosition(index) {
    const SIZE = 3;

    const history = this.state.history.slice();
    const current = history[index].squares.slice();
    const before = history[index-1].squares.slice();

    for (let row_number=0; row_number<SIZE; row_number++) {
      for (let col_number=0; col_number<SIZE; col_number++) {
        let position = SIZE*row_number + col_number;
        if (current[position] !== before[position]) {
          return col_number + ',' + row_number;
        }
      }
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    const highlight = current.highlight.slice();
    if (calculateWinner(squares, highlight) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        highlight: highlight,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const SIZE = 3;

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares, current.highlight);

    const moves = history.map((step, move) => {
      const desc = move
        ? 'Go to move #' + move + ' at ' + this.getPosition(move)
        : 'Go to game start';
      return (
        <li key={move}>
          <button
            className={move===this.state.stepNumber ? "button-selected" : ""}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });
    const display_moves = this.state.isAscendingOrder===true
      ? moves
      : moves.reverse();

    let status;
    if (this.state.stepNumber===SIZE*SIZE && !winner) {
      status = 'Draw';
    } else if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            highlight={current.highlight}
            onClick={(i) => this.handleClick(i)}
          />
          <br />
          <ToggleButton
            value={this.state.isAscendingOrder===true
              ? "Ascending"
              : "Descending"
            }
            onClick={() => this.toggleHistory()}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  toggleHistory(){
    this.setState({
      isAscendingOrder: !this.state.isAscendingOrder,
    });
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squares, highlight) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      highlight[a] = true;
      highlight[b] = true;
      highlight[c] = true;

      return squares[a];
    }
  }
  return null;
}
