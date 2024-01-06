export function getPossitionClass(playersCount, index) {
  switch (playersCount) {
    case 2:
      if (index === 1) return ' top';
      break;
    case 3:
      if (index === 1) return ' left';
      if (index === 2) return ' right';
      break;
    case 4:
      if (index === 1) return ' left';
      if (index === 2) return ' top';
      if (index === 3) return ' right';
      break;
    case 5:
      if (index === 1) return ' left';
      if (index === 2) return ' top left';
      if (index === 3) return ' top right';
      if (index === 4) return ' right';
      break;
    case 6:
      if (index === 1 || index === 2) return ' left';
      if (index === 4 || index === 5) return ' right';
      if (index === 3) return ' top';
      break;
    case 7:
      if (index === 1 || index === 2) return ' left';
      if (index === 3) return ' top left';
      if (index === 4) return ' top right';
      if (index === 5 || index === 6) return ' right';
      break;
    case 8:
      if (index >= 1 && index <= 3) return ' left';
      if (index === 4) return ' top ';
      if (index >= 5) return ' right';
      break;
    default:
      break;
  }
  return '';
}
