import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const container = {
  style: {flex: 1, justifyContent: 'center', alignItems: 'center'},
};
export const row = {
  style: {flexDirection: 'row'},
};
export const col1 = {
  style: {flex: 1},
};
export const col2 = {
  style: {flex: 2},
};
export const col3 = {
  style: {flex: 3},
};
export const col4 = {
  style: {flex: 4},
};
export const col5 = {
  style: {flex: 5},
};
export const col6 = {
  style: {flex: 6},
};
export const col7 = {
  style: {flex: 7},
};
export const col8 = {
  style: {flex: 8},
};
export const col9 = {
  style: {flex: 9},
};
export const col10 = {
  style: {flex: 10},
};
export const col11 = {
  style: {flex: 11},
};
export const col12 = {
  style: {flex: 12},
};
export const colFull = {
  style: {flex: 1, width: '100%'},
}
export const colMd1 = {
  style: {flex: 1},
};
export const colMd2 = {
  style: {flex: 2},
};
export const colMd3 = {
  style: {flex: 3},
};
export const colMd4 = {
  style: {flex: 4},
};
export const colMd5 = {
  style: {flex: 5},
};
export const colMd6 = {
  style: {flex: 6},
};
export const colMd7 = {
  style: {flex: 7},
};
export const colMd8 = {
  style: {flex: 8},
};
export const colMd9 = {
  style: {flex: 9},
};
export const colMd10 = {
  style: {flex: 10},
};
export const colMd11 = {
  style: {flex: 11},
};
export const colMd12 = {
  style: {flex: 12},
};
export const colXs1 = {
  style: {flex: 1},
};
export const colXs2 = {
  style: {flex: 2},
};
export const colXs3 = {
  style: {flex: 3},
};
export const colXs4 = {
  style: {flex: 4},
};
export const colXs5 = {
  style: {flex: 5},
};
export const colXs6 = {
  style: {flex: 6},
};
export const colXs7 = {
  style: {flex: 7},
};
export const colXs8 = {
  style: {flex: 8},
};
export const colXs9 = {
  style: {flex: 9},
};
export const colXs10 = {
  style: {flex: 10},
};
export const colXs11 = {
  style: {flex: 11},
};
export const colXs12 = {
  style: {flex: 12},
};
export const dInlineFlex = {
  style: {display: 'inline-flex'},
};
export const dBlock = {
  style: {display: 'block'},
};
export const dFlex = {
  style: {display: 'flex'},
};
export const dInlineBlock = {
  style: {display: 'inline-block'},
};
export const dInline = {
  style: {display: 'inline'},
};
export const dNone = {
  style: {display: 'none'},
};
export const vTop = {
  style: {alignItems: 'flex-start'},
};
export const vCenter = {
  style: {alignItems: 'center'},
};
export const vBottom = {
  style: {alignItems: 'flex-end'},
};
export const hStart = {
  style: {justifyContent: 'flex-start'},
};
export const hCenter = {
  style: {justifyContent: 'center'},
};
export const hEnd = {
  style: {justifyContent: 'flex-end'},
};
export const hBetween = {
  style: {justifyContent: 'space-between'},
};
export const hAround = {
  style: {justifyContent: 'space-around'},
};
export const fRow = {
  style: {flexDirection: 'row'},
};
export const fRowReverse = {
  style: {flexDirection: 'row-reverse'},
};
export const fColumn = {
  style: {flexDirection: 'column'},
};
export const fColumnReverse = {
  style: {flexDirection: 'column-reverse'},
};
export const tLeft = {
  style: {textAlign: 'left'},
};
export const tCenter = {
  style: {textAlign: 'center'},
};
export const tRight = {
  style: {textAlign: 'right'},
};

export const blocks = StyleSheet.create({
  container: container.style,
  row: row.style,
  col1: col1.style,
  col2: col2.style,
  col3: col3.style,
  col4: col4.style,
  col5: col5.style,
  col6: col6.style,
  col7: col7.style,
  col8: col8.style,
  col9: col9.style,
  col10: col10.style,
  col11: col11.style,
  col12: col12.style,
  colMd1: colMd1.style,
  colMd2: colMd2.style,
  colMd3: colMd3.style,
  colMd4: colMd4.style,
  colMd5: colMd5.style,
  colMd6: colMd6.style,
  colMd7: colMd7.style,
  colMd8: colMd8.style,
  colMd9: colMd9.style,
  colMd10: colMd10.style,
  colMd11: colMd11.style,
  colMd12: colMd12.style,

  dBlock: dBlock.style,
  dFlex: dFlex.style,
  dInlineBlock: dInlineBlock.style,
  dInline: dInline.style,
  dNone: dNone.style,
  vTop: vTop.style,
  vCenter: vCenter.style,
  vBottom: vBottom.style,
  hStart: hStart.style,
  hCenter: hCenter.style,
  hEnd: hEnd.style,
  hBetween: hBetween.style,
  hAround: hAround.style,
  fRow: fRow.style,
  fRowReverse: fRowReverse.style,
  fColumn: fColumn.style,
  fColumnReverse: fColumnReverse.style,
  tLeft: tLeft.style,
  tCenter: tCenter.style,
  tRight: tRight.style,
});
