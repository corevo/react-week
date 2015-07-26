var React = require('react');
var client = require('socket.io-client')('http://localhost:8080');

class Register extends React.Component {
    constructor () {
        super();
        this.register = this.register.bind(this);
    }
    static propTypes = {
        signin: React.PropTypes.func.isRequired
    };
    register (event) {
        if (event.key === 'Enter') {
            this.props.signin(event.target.value);
        }
    }
    render () {
        return (
            <input type="text" placeholder="username" onKeyPress={this.register} />
        );
    }
}

class MessageInput extends React.Component {
    constructor () {
        super();
        this.send = this.send.bind(this);
    }
    static propTypes = {
        sendMessage: React.PropTypes.func.isRequired
    };
    send (event) {
        if (event.key === 'Enter') {
            this.props.sendMessage(event.target.value);
            event.target.reset();
        }
    }
    render () {
        return (
            <input type="text" placeholder="message" onKeyPress={this.send} />
        );
    }
}

class Message extends React.Component {
    static propTypes = {
        message: React.PropTypes.string.isRequired
    };
    render () {
        return (
            <li>{this.props.message}</li>
        );
    }
}

class Messages extends React.Component {
    render () {
        return (
            <ul>{this.props.messages.map((message) => (
                    <li key={message.id}>{message.message}</li>
                ))}</ul>
        );
    }
}

class Chat extends React.Component {
    constructor () {
        super();
        this.signin = this.signin.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.state = {
            messageId: 0,
            messages: []
        };

        // socket.io
        client.on('login', function (data) {
            this.setState({
                connected: true
            });
            this.addMessage('welcome to the chat!');
        }.bind(this));
        client.on('new message', function(data) {
            this.addMessage(data.message);
        }.bind(this));
        client.on('user joined', function(data) {
            this.addMessage(data.username + ' joined the chat!');
        }.bind(this));
        client.on('user left', function(data) {
            this.addMessage(data.username + ' left the chat!');
        }.bind(this));
    }
    signin (name) {
        this.setState({
            username: name
        });
        client.emit('add user', name);
    }
    sendMessage (message) {
        this.addMessage(message);
        client.emit('new message', message);
    }
    addMessage (message) {
        this.state.messageId = this.state.messageId + 1;
        this.state.messages.push(
            {
                message: message,
                id: this.state.messageId
            });
        this.forceUpdate();
    }
    render () {
        return (
            <div className="container">
                {(this.state.connected) ?
                    <div className="chat">Hello, <b>{this.state.username}</b>
                    <Messages messages={this.state.messages} />
                    <MessageInput sendMessage={this.sendMessage} /></div> :
                    <Register signin={this.signin} /> }
            </div>
        );
    }
}

React.render(<Chat />, document.getElementById('app'));
