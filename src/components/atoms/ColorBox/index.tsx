import React, {useState} from 'react';
import PropTypes from 'prop-types';

ColorBox.propTypes = {};

function ColorBox() {

    const [color, setColor] = useState(() => {
        return sessionStorage.getItem('box-color') || 'deeppink';
    });
    const [counter, setCounter] = useState({i: 0});

    const getRandomColor = () => {
      const COLOR_LIST = ['deeppink', 'blue', 'green', 'red'];
      return COLOR_LIST[Math.trunc(Math.random() * COLOR_LIST.length)];
    }
    const handleClick = () => {
        const randomColor = getRandomColor();
        setColor(randomColor);
        counter.i++;
        sessionStorage.setItem('box-color', randomColor);
    }

    return (
        <div className="color-box" style={{backgroundColor: color}} onClick={handleClick}>
            Color box
        </div>
    );
}

export default ColorBox;
