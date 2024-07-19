/**
 * 
 */
export const promiseSafe = (dataOrPromise: any | Promise<any>) => {
    let promise: Promise<string | null>;
    if (dataOrPromise instanceof Promise) {
        promise = dataOrPromise;
    } else {
        promise = Promise.resolve(dataOrPromise);
    }
    return promise;
}