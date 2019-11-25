const convertMinsToHrsMins = (time: number): string | null => {
  if (time) {
    const hours = Math.floor(time / 60);
    const m = time % 60;
    const minutes = m < 10 ? `0${time}` : m;
    return `${hours}H${minutes}`;
  }
  return null;
};

export default convertMinsToHrsMins;
