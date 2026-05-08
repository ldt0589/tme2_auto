type DateRange =
  | 'today'
  | 'this_week'
  | 'last_week'
  | 'next_week'
  | 'this_month';

function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}

export function getDateRange(dateRange: DateRange) {
  const today = new Date();
  let start;
  let end;

  switch (dateRange) {
    case 'today':
      break;

    case 'this_week': {
      const day = today.getDay() || 7;
      start = new Date(today);
      start.setDate(today.getDate() - day + 1);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      break;
    }

    case 'last_week': {
      const day = today.getDay() || 7;
      start = new Date(today);
      start.setDate(today.getDate() - day - 6);
      end = new Date(today);
      end.setDate(today.getDate() - day);
      break;
    }

    case 'next_week': {
      const day = today.getDay() || 7;
      start = new Date(today);
      start.setDate(today.getDate() - day + 8);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      break;
    }

    case 'this_month':
      break
  }

  return {
    startDate: formatDate(start || new Date()),
    endDate: formatDate(end || new Date()),
  };
}