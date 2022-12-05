export const info = (debug: boolean, ...params: string[]) => log(debug, 'info', ...params)

export const log = (debug: boolean, level: 'warn' | 'error' | 'info', ...params: string[]) => {
    if (debug) {
        params.forEach(param => {
            console[level](param)
        });
    }
}