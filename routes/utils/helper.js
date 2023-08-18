function idGenerator() {
  const date = new Date();
  const time = date.getTime();
  const char = `abcdefghijklmnopqrstuv`;
  let str = '';

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * char.length);
    str += char[randomIndex];
  }
  str += time;

  return slicer(str, 6, 3, '-');
}

function slicer(data, length, interval, character) {
  let str = '';
  // const loopDuration = length > str.length ? str.length : length;
  let counter = 0;
  for (let i = 0; i < length; i++) {
    if (counter === interval) {
      str += character;
      counter = 0;
    }
    str += data[i];
    counter++;
  }

  return str;
}

module.exports = { idGenerator, slicer };
