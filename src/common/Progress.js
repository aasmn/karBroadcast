import React, { Component } from 'react';
class Main extends Component {

    render() {
        const innerStyle = {
            backgroundColor: this.props.bgColor || '#093770'
        }
        const bgStyle = {
            width: (this.props.percent || 0) + '%',
            backgroundColor: this.props.color || '#ed3aeb',
            height: this.props.height || '8px'
        }
        return (
            <div className="progress-outer">
                <div className="progress-inner" style={innerStyle}>
                    <div className="progress-bg" style={bgStyle}></div>
                </div>
            </div>
        );
    }
}

export default Main;
