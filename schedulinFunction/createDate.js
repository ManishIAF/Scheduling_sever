function getDatesInRange(startingDate, endDate) {

    const [startingYear,startingMonth,startingDay] = startingDate.split('-');
    const [endYear,endMonth,endDay] = endDate.split('-');
    
    const startDate = new Date(startingYear, startingMonth - 1, startingDay);
    const lastDate = new Date(endYear, endMonth - 1, endDay);
    
    const dates = [];
    for (let date = startDate; date <= lastDate; date.setDate(date.getDate() + 1)) {
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      dates.push(formattedDate);
    }
    
    return dates;
  }
  
export default getDatesInRange;