/*
 * @Description: 函数相关的 hooks
 * @Author: xuks
 * @Date: 2022-06-24 15:10:25
 * @LastEditTime: 2023-02-16 15:43:18
 */
/**
 * @description: 修改变量值 自动同步更新视图、localStroage、sessionStorage
 * @param {*} key 修改的变量值
 * @param {*} val 存储的值
 * @param {*} type 修改的Stroage类型 [persistent | session]
 * @return {*} variable 返回 ref类型变量
 */
export function useQzStroage(key, val, type = 'persistent') {
    const variable = ref(val);
    watch(
        variable,
        (v) => {
            window.Storage[type]?.set(key, variable.value);
        },
        {
            immediate: true,
        },
    );
    return variable;
}