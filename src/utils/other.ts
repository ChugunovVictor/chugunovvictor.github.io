export function getDate(value: Date): string {
    const days = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()
    const months = (value.getMonth() + 1) < 10 ? `0${value.getMonth() + 1}` : value.getMonth() + 1
    const year = value.getFullYear()

    return `${days}.${months}.${year}`
}


export function delay(value: number) {
    return new Promise(resolve => setTimeout(resolve, value));
}