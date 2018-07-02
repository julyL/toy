import {
    globalShortcut
} from 'electron';

let pre_hotkey;
export default function setShortcut(setting) {
    return new Promise(function (resolve, reject) {
        let hotkey = setting.hotkey;
        if (hotkey == pre_hotkey && pre_hotkey) {
            resolve();
            return;
        } else {
            pre_hotkey && globalShortcut.unregister(pre_hotkey);
            pre_hotkey = hotkey;
        }
        try {
            let ret = globalShortcut.register(hotkey, () => {
                setting.cb && setting.cb();
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
}