import {
    globalShortcut
} from 'electron';

import emitter from '../util/emitter'

export default function setShrotCut() {
    globalShortcut.register('Alt+d', () => {
        emitter.emit("switchVisible");
    })
    globalShortcut.register('Super+d', () => {
        emitter.emit("switchVisible");
    })

}