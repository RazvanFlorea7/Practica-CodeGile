class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }

    off(event, listenerToRemove) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
    }
}

const emitter = new EventEmitter();

function responseToEvent(msg) {
    console.log(msg);
}
function anotherResponse(msg) {
    console.log(msg.split("").reverse().join(""));
}

emitter.on('greet', responseToEvent);

emitter.on('greet', anotherResponse)

emitter.emit('greet', 'Hello World!'); 

emitter.off('greet', responseToEvent);

emitter.emit('greet', 'Hello World!');
