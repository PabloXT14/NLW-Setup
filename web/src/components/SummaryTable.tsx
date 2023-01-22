import { generateDaysFromYearBeginning } from "../utils/generate-days-from-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const summaryDates = generateDaysFromYearBeginning();

const amountOfWeeks = 18;
const daysPerWeek = 7;
const miniumAmountOfDaysToShowInTheTable = amountOfWeeks * daysPerWeek;
const amountOfDaysRemainingToFillTheTable = miniumAmountOfDaysToShowInTheTable - summaryDates.length;

export function SummaryTable() {
  return (
    <div className="w-full flex">
      {/* INDICE DE WEEKDAYS */}
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => {
          return (
            <div
              key={`${weekDay}-${index}`}
              className="text-zinc-400 text-xl w-10 h-10 font-bold flex items-center justify-center"
            >
              {weekDay}
            </div>
          )
        })}
      </div>
      {/* DAYS */}
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map(date => {
          return (
            <HabitDay key={date.toString()} />
          )
        })}

        {amountOfDaysRemainingToFillTheTable > 0 &&
          Array.from({ length: amountOfDaysRemainingToFillTheTable }).map((_, index) => {
            return (
              <div
                key={index}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            )
          })}
      </div>
    </div>
  )
}