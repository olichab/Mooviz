const convertMinsToHrsMins = mins => {
  if (mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    m = m < 10 ? "0" + m : m;
    return `${h}H${m}`;
  }
};

export default convertMinsToHrsMins;
