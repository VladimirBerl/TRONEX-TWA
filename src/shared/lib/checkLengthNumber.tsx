export const checkLengthNumbers = (
  num: string,
  BASE_LENGTH: number,
  BASE_SIZE: number,
  SHRINK_SPEED: number,
) => {
  const length = num.length;
  const size = Math.max(BASE_LENGTH, BASE_SIZE - (length - SHRINK_SPEED));
  return <span style={{ fontSize: `${size}px` }}>{num}</span>;
};
