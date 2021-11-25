import classes from "./ChunkFactCard.module.css";

const ChunkFactCard = (props: { value: string; icon_url: string }) => {
  return (
    <div className={classes.ChunkFactCard}>
      <img
        className={classes.ChunkFactCardIcon}
        src={props.icon_url}
        alt="chunk icon"
      />
      <p className={classes.ChunkFactCardText}>{props.value}</p>
    </div>
  );
};

export default ChunkFactCard;
