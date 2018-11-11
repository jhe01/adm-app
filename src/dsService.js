import createDeepstream from "deepstream.io-client-js";

export const ds = createDeepstream("localhost:6020");
export const dsInstance = ds.login();
export const dsRecord = dsInstance.record;
