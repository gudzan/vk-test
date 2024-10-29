const convertDateString = (dateString: string): string => {
  if (Date.parse(dateString)) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' ' + date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }
  else {
    throw new Error('Invalid Date');
  }
}

export default convertDateString