import EventEmitter from 'events';

const emitter = new EventEmitter();
emitter.setMaxListeners(Infinity);

export default emitter;