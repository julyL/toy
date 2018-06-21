import {
    globalShortcut
} from 'electron';

import emitter from '../util/emitter';
let pre_hotkey;
export default function setShortcut(setting = {}) {
    return new Promise(function (resolve, reject) {
        emitter.emit("getAppSetting", (data) => {
            //目前只有一个快捷键,取第一个
            let hotkey = setting.hotkey || data.shortcut[0].hotkey;
            if (hotkey == pre_hotkey && pre_hotkey) {
                resolve();
                return;
            } else {
                pre_hotkey && globalShortcut.unregister(pre_hotkey);
                pre_hotkey = hotkey;
            }
            try {
                let ret = globalShortcut.register(hotkey, () => {
                    emitter.emit("switchVisible");
                })
                if (!ret) {
                    reject(hotkey + "快捷键注册失败");
                } else {
                    resolve();
                }
            } catch (err) {
                reject(hotkey + "快捷键注册失败");
            }
        })
    })
}