import range from './range'

const START_YEAR = 1900
const END_YEAR = 2100

const UNIT_YEAR = '年'
const UNIT_MONTH = '月'
const UNIT_DAY = '日'

function isLeapYear(y) {
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0
};

function getDays(y, m) {
    y = Number(y)
    m = Number(m)
    let endDay = null
    switch (m) {
        case 2:
            // endDay = 29
            endDay = isLeapYear(y) ? 29 : 28;
            break
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            endDay = 31;
            break
        case 4:
        case 6:
        case 9:
        case 11:
        default:
            endDay = 30;
            break
    }
    const days = range(1, endDay, false, UNIT_DAY)
    return days.map((day) => {
        return {
            value: day
        }
    })
};

function getDateDay() {
    const year = range(START_YEAR, END_YEAR, false, UNIT_YEAR)
    const month = range(1, 12, false, UNIT_MONTH)
    const date = []

    year.forEach(y => {
        const cascaseMonth = month.map(m => {
            return {
                value: m,
                children: []
            }
        })
        const item = {
            value: y,
            children: cascaseMonth
        }

        item.children.forEach(m => {
            m.children = getDays(y.slice(0, -1), m.value.slice(0, -1))
        })

        date.push(item)
    })
    return date
}

const dateData = getDateDay()

const date = new Date()
const dateAnchor = [{
    value: `${date.getFullYear()}${UNIT_YEAR}`
}, {
    value: `${date.getMonth() + 1}${UNIT_MONTH}`
}, {
    value: `${date.getDate()}${UNIT_DAY}`
}]

export {
    dateAnchor,
    dateData
}