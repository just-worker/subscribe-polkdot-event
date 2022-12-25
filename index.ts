import { ApiPromise, WsProvider } from '@polkadot/api';
import { AnyFunction } from '@polkadot/types/types';
// 本地地址
const WEB_SOCKET_URI = 'ws://127.0.0.1:9944/';
// 链接
const connectSubstrate = async () => {
    const wsProvider = new WsProvider(WEB_SOCKET_URI);
    const api = await ApiPromise.create({provider: wsProvider, types: {}});
    await api.isReady;
    console.log("connecte succeed!")
    return api;
};
// 事件监听
const listener = (event: AnyFunction) => {
    console.log(`Event: ${JSON.stringify(event)}`);
};
// 监听事件
const subscribeEvents = async (api: ApiPromise) => {
    api.query.system.events(listener);
}
// 定时休眠
const sleep = async (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('');
        }, ms);
    })
}
// 主体程序
const main = async () => {
    const api = await connectSubstrate();
    subscribeEvents(api);
    await sleep(600000);
}

main().then(() => {
    console.log("exited !");
    process.exit(0);
});