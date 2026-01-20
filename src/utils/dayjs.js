import dayjs from "dayjs";

export default function getMonth(month = dayjs().month()) {
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year , month , 1)).day();

    let correntMonthCount = 0 - firstDayOfTheMonth;
    //2D array - 5 rows , 7 column
    const dayMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            correntMonthCount++;
            return dayjs(new Date(year , month , correntMonthCount));
        });
    });

    return dayMatrix;
}