/*
 * @Description: 组件相关的 hooks
 * @Author: xuks
 * @Date: 2022-06-25 15:10:25
 * @LastEditTime: 2023-04-06 11:11:51
 */

import { isFunction, rAF } from 'utils';
import { tryOnUnmounted, tryOnMounted } from '@vueuse/core';

/**
 * @description: 获取鼠标坐标
 * @return {mouse} 鼠标当前位置信息
 * @return {stop} stop清除副作用函数
 */
export function useMouse({ eventName, el, handler }) {
    const mouse = reactive({ x: 0, y: 0 });
    const element = unref(el) || window?.document;

    if (!eventName || !element) {
        throw new Error(`useMouse need an eventName and element, but got ${typeof eventName} and ${typeof element}`);
    }
    const handle = (ev) => {
        const { pageX, pageY, movementX, movementY, offsetX, offsetY, x, y, clientX, clientY } = ev;
        Object.assign(mouse, {
            pageX,
            pageY,
            movementX,
            movementY,
            offsetX,
            offsetY,
            clientX,
            clientY,
            x,
            y,
        });
        isFunction(handler) && handler(ev, mouse);
    };
    const stop = () => {
        element.removeEventListener(eventName, handle);
    };
    element && element.addEventListener(eventName, handle);
    /* 移除事件监听 */
    tryOnUnmounted(stop);

    return {
        mouse,
        stop,
    };
};

/**
 * @description: 延迟加载判断
 * @param {Boolean} len 列表长度
 * @param {Boolean} n 当前列表index
 * @return {*}
 */
export function useDeferRender(len) {
    const count = ref(0);

    const runStep = () => {
        const step = () => {
            rAF(() => {
                count.value++;
                if (count.value < len) {
                    step();
                }
            });
        };
        step();
    };

    tryOnMounted(runStep);

    return {
        deferRender: (n) => count.value >= n,
    };
}
