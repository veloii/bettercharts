import WeekDayContent from "./WeekDayContent";
import WeeklyDay from "./WeeklyDay";

const CalendarWeeklyDays = () => {
  return (
    <div>
      <div className="shadow hide-scrollbar">
        <div className="flex divide-x dark:divide-gray-700">
          <div className="w-[450px]"></div>
          <WeeklyDay day="Mon" date="10" />
          <WeeklyDay day="Tue" date="11" />
          <WeeklyDay day="Wed" date="12" />
          <WeeklyDay day="Thu" date="13" />
          <WeeklyDay day="Fri" date="15" />
          <WeeklyDay day="Sat" date="15" />
          <WeeklyDay day="Sun" date="16" />
          <div className="w-64"></div>
        </div>
      </div>
      <div className="calendar-height">
        <div className="flex divide-x dark:divide-gray-700">
          <div className="w-[450px] dark:text-white text-right mt-[25px] text-sm">
            <div className="pr-2">
              <div className="h-32">00:00</div>
              <div className="h-32">01:00</div>
              <div className="h-32">02:00</div>
              <div className="h-32">03:00</div>
              <div className="h-32">04:00</div>
              <div className="h-32">05:00</div>
              <div className="h-32">06:00</div>
              <div className="h-32">07:00</div>
              <div className="h-32">08:00</div>
              <div className="h-32">09:00</div>
              <div className="h-32">10:00</div>
              <div className="h-32">11:00</div>
              <div className="h-32">12:00</div>
              <div className="h-32">13:00</div>
              <div className="h-32">14:00</div>
              <div className="h-32">15:00</div>
              <div className="h-32">16:00</div>
              <div className="h-32">17:00</div>
              <div className="h-32">18:00</div>
              <div className="h-32">19:00</div>
              <div className="h-32">20:00</div>
              <div className="h-32">21:00</div>
              <div className="h-32">22:00</div>
              <div className="">23:00</div>
            </div>
          </div>
          <WeekDayContent />
          <WeekDayContent />
          <WeekDayContent />
          <WeekDayContent />
          <WeekDayContent />
          <WeekDayContent />
          <WeekDayContent />
          <div className="w-64"></div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWeeklyDays;
