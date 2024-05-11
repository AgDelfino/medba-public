export const getFormattedDate = (date: string) =>
  new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

export const getAge = (date: string) => {
  const year = new Date(date).getFullYear();

  return new Date().getFullYear() - year;
};
