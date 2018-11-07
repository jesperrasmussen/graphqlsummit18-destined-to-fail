export const CircuitState = class CircuitState {
    static logCircuitstate(error) {
        switch (error.message) {
            case "CommandTimeOut":
                console.log('⚠️ Service timed out');
                break;
            case "OpenCircuitError":
                console.log('⛔️ Circuit Breaker in OPEN state - halting requests to service to back off.');
                break;
            default:
                console.log('I dont know - ' + error.message);
        }
    }
}