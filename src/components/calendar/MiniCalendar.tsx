interface MiniCalendarProps {
  currentMonth: string;
  currentYear: number;
}

export const MiniCalendar = ({ currentMonth, currentYear }: MiniCalendarProps) => {
  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  
  // Generate calendar days for September 2025
  const generateCalendarDays = () => {
    const days = [];
    const today = 4; // September 4th is highlighted in the image
    
    // Previous month days (empty)
    for (let i = 0; i < 6; i++) {
      days.push({ day: '', isCurrentMonth: false, isToday: false });
    }
    
    // Current month days
    for (let day = 1; day <= 30; day++) {
      days.push({ 
        day: day.toString(), 
        isCurrentMonth: true, 
        isToday: day === today 
      });
    }
    
    // Next month days to fill the grid
    for (let i = 1; i <= 6; i++) {
      days.push({ day: i.toString(), isCurrentMonth: false, isToday: false });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-foreground">{currentMonth}</h3>
        <p className="text-sm text-muted-foreground">{currentYear}</p>
      </div>
      
      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-xs font-medium text-muted-foreground text-center py-1">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayObj, index) => (
          <button
            key={index}
            className={`
              h-8 w-8 text-sm rounded-md transition-colors
              ${dayObj.isCurrentMonth 
                ? dayObj.isToday 
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'text-foreground hover:bg-muted'
                : 'text-muted-foreground/50'
              }
            `}
          >
            {dayObj.day}
          </button>
        ))}
      </div>
    </div>
  );
};