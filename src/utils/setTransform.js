export const setTransform = (ref, px) => {
  ref.current.style.transform = `translateX(-${px}px)`;
}
