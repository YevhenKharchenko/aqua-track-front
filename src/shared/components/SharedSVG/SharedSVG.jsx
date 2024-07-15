import { sprite } from '../../../assets/icons/index.js';

const SharedSVG = ({ svgId, ...props }) => {
  return (
    <>
      <svg {...props}>
        <use href={`${sprite}#${svgId}`}></use>
      </svg>
    </>
  );
};
export default SharedSVG;
