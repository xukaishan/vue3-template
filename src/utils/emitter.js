export class EventEmitter {
    constructor () {
        this.listeners = {};
    }

    /**
     * 注册事件。同一个事件名可以注册多个处理函数。
     * @param {String} ev
     * @param {Function} fn
     */
    on (ev, fn) {
        // 如果还不存在事件处理函数，创建一个数组来存储事件处理函数
        if (!this.listeners[ev]) {
            this.listeners[ev] = [];
        }

        // 检查事件处理函数是否为函数对象，只有为函数时，才进行注册
        if (fn instanceof Function) {
            this.listeners[ev].push(fn);
        }
        return this;
    }

    /**
     * 注册事件 只执行一次。
     * @param {String} ev
     * @param {Function} fn
     */
    once (ev, fn) {
        const self = this;
        function listener () {
            self.off(ev, listener);
            fn.apply(null, arguments);
        };

        return this.on(ev, listener);
    }

    /**
     * 触发事件。如果同一事件名注册了多个处理函数，将根据注册的顺序调用。
     * @param {String} ev
     * @param {Any} args
     */
    trigger (ev, args) {
        if (this.listeners[ev]) {
            args = Object.prototype.toString.call(args) === '[object Array]' ? args : [args];
            const listeners = this.listeners[ev].slice();
            for (let i = 0; i < listeners.length; i++) {
                try {
                    listeners[i].apply(null, args);
                } catch (e) {
                    console.warn(`name:${ev} , index:${i} error:`, e);
                }
            }
        }
        return this;
    }

    /**
     * 取消注册事件的回调函数。
     * @param {String} ev
     * @param {Function} fn
     */
    off (ev, fn) {
        if (!!this.listeners[ev] && this.listeners[ev].length > 0) {
            // 如果对象存在，删除相应的对象
            if (fn) {
                const fns = [];
                for (let i = 0; i < this.listeners[ev].length; i++) {
                    if (fn !== this.listeners[ev][i]) {
                        fns.push(this.listeners[ev][i]);
                    }
                }
                this.listeners[ev] = fns;
            } else {
                // 如果为空，删除所有注册的函数
                this.listeners[ev] = [];
            }
        }
        return this;
    }
}
