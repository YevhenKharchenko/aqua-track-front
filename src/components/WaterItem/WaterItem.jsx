import css from './WaterItem.module.css';
const WaterItem = () => {
  return (
    <>
      <svg width="38" height="38">
        <use className={css.iconGlass} href="./src/assets/icons/sprite.svg#icon-glass-38x38"></use>
      </svg>
      <div className={css.infoContainer}>
        <p className={css.waterVolum}>1L</p>
        <p className={css.time}>10:20AM</p>
      </div>

      <div className={css.iconThumb}>
        <svg width="14" height="14">
          <use className={css.iconEdit} href="./src/assets/icons/sprite.svg#icon-edit-14x14"></use>
        </svg>
        <svg width="14" height="14">
          <use
            className={css.iconTrash}
            href="./src/assets/icons/sprite.svg#icon-trash-14x14"
          ></use>
        </svg>
      </div>
    </>
  );
};
export default WaterItem;
