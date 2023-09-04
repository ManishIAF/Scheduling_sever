import Table from 'cli-table';

  function ExamScheduleDate(combinedObject) {
    const slots = [...new Set(Object.values(combinedObject).map(item => item.slot))];
    slots.sort(); // Sort the slots in ascending order
  
    const table = new Table({
      head: ['Date', ...slots],
      colWidths: Array(slots.length + 1).fill(20) // Initialize colWidths array with default width
    });
  
    const subjectsBySlot = {};
    const dates = Array.from(new Set(Object.values(combinedObject).map(item => item.date)));
  
    for (const date of dates) {
      const row = [];
      row.push(date);
  
      for (const slot of slots) {
        const subjects = Object.keys(combinedObject).filter(subject => combinedObject[subject].date === date && combinedObject[subject].slot === slot);
        const subjectString = subjects.join('\n');
        row.push(subjectString);
  
        const maxSubjectLength = Math.max(...subjects.map(subject => subject.length));
        const slotIndex = table.options.head.indexOf(slot);
        if (maxSubjectLength > table.options.colWidths[slotIndex]) {
          table.options.colWidths[slotIndex] = maxSubjectLength;
        }
      }
  
      table.push(row);
    }
  
    return table.toString();
  }
  
  
  

export default ExamScheduleDate