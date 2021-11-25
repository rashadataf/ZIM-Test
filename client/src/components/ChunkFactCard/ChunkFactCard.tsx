import chunkServices from "../../services/fetchChunks";
import classes from "./ChunkFactCard.module.css";

const ChunkFactCard = (props: {
  value: string;
  icon_url: string;
  url: string;
  id: string;
}) => {
  return (
    <div className={classes.ChunkFactCard}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={classes.AddToFavourite}
        onClick={() =>
          chunkServices.addChunkToFavourite(
            props.url,
            props.value,
            props.icon_url,
            props.id
          )
        }
      >
        <path d="M12 4.435C10.011-.964 0-.162 0 8.003 0 12.071 3.06 17.484 12 23c8.94-5.516 12-10.929 12-14.997C24-.115 14-.996 12 4.435z"></path>
      </svg>
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
