export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];