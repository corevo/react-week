var React = require('react');

var ContentToggle = React.createClass({
    getInitialState () {
        return {
            isOpen: false
        };
    },
    handleClick () {
        this.setState({
            isOpen: !this.state.isOpen
        });
    },
    render () {
        return (
            <div className="test">
                <div onClick={this.handleClick}>hello there</div>
                { this.state.isOpen && <img height="200" src={this.props.image} /> }
            </div>
        );
    }
});

React.render(<ContentToggle image='http://californiatortilla.com/caltort/wp-content/uploads/2012/11/Steak-taco.jpg' />, document.getElementById('app'));
