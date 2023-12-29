export function msToMSMS(ms) {
    return {
        minutes: Math.floor((ms / 60000)),
        seconds: Math.floor(((ms - (Math.floor(ms / 60000) * 60000)) / 1000)),
        milliseconds: (ms - (Math.floor(ms/60000) * 60000)) - (Math.floor(((ms - (Math.floor(ms / 60000) * 60000)) / 1000)) * 1000)
    }
}