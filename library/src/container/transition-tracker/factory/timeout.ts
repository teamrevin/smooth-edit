export function timeoutManagementFactory(
    idlePeriod: number,
    totalPeriod: number,
    onTimeout: () => void
) {
    let idleTimeout: number | null = null;
    let totalTimeout: number | null = null;

    function activateIdleTimeout() {
        if (idleTimeout === null) {
            idleTimeout = setTimeout(onTimeout, idlePeriod);
        }
    }

    function clearIdleTimeout() {
        if (idleTimeout !== null) {
            clearTimeout(idleTimeout);
            idleTimeout = null;
        }
    }

    function resetIdleTimeout() {
        clearIdleTimeout();
        activateIdleTimeout();
    }

    function activateTotalTimeout() {
        if (totalTimeout === null) {
            totalTimeout = setTimeout(onTimeout, totalPeriod);
        }
    }

    function clearTotalTimeout() {
        if (totalTimeout !== null) {
            clearTimeout(totalTimeout);
            totalTimeout = null;
        }
    }

    return {
        activateIdleTimeout,
        clearIdleTimeout,
        resetIdleTimeout,
        activateTotalTimeout,
        clearTotalTimeout,
    };
}
