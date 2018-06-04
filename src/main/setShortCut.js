import {
    globalShortcut
} from 'electron';

import emitter from './emitter'

export default function setShrotCut() {
    const ret = globalShortcut.register('Alt+q', () => {
        emitter.emit("switchVisible");
    })

    if (!ret) {
        console.log('registration failed')
    } 
}