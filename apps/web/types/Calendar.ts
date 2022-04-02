export default interface CalendarContext {
  selectedDay?: CalendarDay | undefined | null;
  selectedDayMobile?: CalendarDay[] | undefined | null;
  days: CalendarDay[];
}

export interface CalendarDay {
  homeworkId: number;
  date: Date;
  duration: number;
  bgColor: string;
  textColor: string;
  name: string;
  notes: string;
  completed: boolean;
}
