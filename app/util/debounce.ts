const debounce = <T extends (...args: any[]) => any>(
    callback: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: number | null = null;
    return (...args: Parameters<T>): void => {
        if (timeoutId !== null) {
            window.clearTimeout(timeoutId);
        }
        timeoutId = window.setTimeout(() => {
            callback(...args);
        }, wait);
    };
};

export default debounce;
