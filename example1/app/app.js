var React = require('react');

var ContentToggle = React.createClass({
    getInitialState () {
        return {
            isOpen: false,
            drools: 0
        };
    },
    handleClick () {
        this.setState({
            isOpen: !this.state.isOpen,
            drools: (!this.state.isOpen) ? this.state.drools + 1 : this.state.drools
        });
    },
    render () {
        return (
            <div className="item">
                <a className="btn" onClick={this.handleClick}>{this.props.name} drools: {this.state.drools}</a>
                { this.state.isOpen && <img height="100" src={this.props.image} /> }
            </div>
        );
    }
});

var TacoList = React.createClass({
    getInitialState () {
        return {
            tacos: [
                {
                    name: 'asado',
                    image: 'http://californiatortilla.com/caltort/wp-content/uploads/2012/11/Steak-taco.jpg'
                },
                {
                    name: 'vegetarian',
                    image: 'http://cdn2.blisstree.com/wp-content/uploads/2011/04/veggie-tacos1.jpg'
                }
            ]
        };
    },
    render () {
        return (
            <div className="list">
                {this.state.tacos.map((taco) => (
                    <ContentToggle name={taco.name} image={taco.image} />
                ))}
            </div>
        );
    }
});

React.render(<TacoList />, document.getElementById('app'));
