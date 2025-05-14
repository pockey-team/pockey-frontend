interface Props {
  index: number;
  current: number;
}

export const getRotation = ({ index, current }: Props) => {
  const ROTATION_FACTOR = -3;
  const diff = index - current;

  return diff * ROTATION_FACTOR;
};
