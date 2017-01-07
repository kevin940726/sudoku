import { List, Range, Repeat, is } from 'immutable';

const Sudoku = () => {
  const C = Range(0, 9).flatMap(i => (
    Range(0, 9).flatMap(j => (
      Range(0, 9).map(k => (
        List([
          i * 9 + j,
          ~~(i / 3) * 3 + ~~(j / 3) * 9 + k + 81,
          i * 9 + k + 162,
          j * 9 + k + 243,
        ])
      ))
    ))
  )).toList();

  let R = List(Repeat(List(), 324));
  for (let r = 0; r < 729; r++) {
    for (let c2 = 0; c2 < 4; c2++) {
      R = R.update(C.get(r).get(c2), rr => rr.push(r));
    }
  }
};

export default Sudoku;

Sudoku();
