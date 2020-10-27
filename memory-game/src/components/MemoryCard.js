import React from 'react';
import './MemoryCard.css';
export default class MemoryCard extends React.Component {

render() {
const innerClass =  this.props.isFlipped ? 'MemoryCard__inner flipped' : 'MemoryCard__inner'



return (
    
    <div className='MemoryCard' onClick={this.props.pickCard}>
    <div className={innerClass}>
        <div className='MemoryCard__back'>
            <img src="https://www.digitalcrafts.com/img/logo-wrench-white.png" alt="" />
        </div>
        <div className='MemoryCard__front'>
            {this.props.symbol}
        </div>
    </div>
    </div>
    
    
)
}
}
