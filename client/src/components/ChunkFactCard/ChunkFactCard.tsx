import React from "react";
import Modal from "react-modal";
import chunksServices from "../../services/fetchChunks";
import classes from "./ChunkFactCard.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
  },
};

Modal.setAppElement("#root");

const ChunkFactCard = (props: {
  value: string;
  icon_url: string;
  url: string;
  id: string;
  isFavourite?: boolean;
  updateFavouriteChunks?: Function;
}) => {
  const [isFavourite, setIsFavourite] = React.useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    if (!props.isFavourite && !isFavourite) {
      chunksServices
        .isChunkFavourite(props.id)
        .then((result) => setIsFavourite(result));
    }
  });

  function closeModal() {
    setIsOpen(false);
  }

  const addToFavourite = async () => {
    if (
      await chunksServices.addChunkToFavourite(
        props.url,
        props.value,
        props.icon_url,
        props.id
      )
    )
      setIsFavourite(true);
  };

  function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = event.currentTarget.value;
    setText(text);
  }

  async function handleUpdateChunk() {
    try {
      const isUpdated = await chunksServices.updateFavouriteChunk(
        text,
        props.id
      );
      if (isUpdated) {
        setIsOpen(false);
        if (props.updateFavouriteChunks) props.updateFavouriteChunks();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const removeFromFavourite = async () => {
    if (await chunksServices.removeChunkFromFavourite(props.id))
      setIsFavourite(false);
  };

  const toogleFavourite = async () => {
    if (isFavourite || props.isFavourite) {
      await removeFromFavourite();
      if (props.updateFavouriteChunks) props.updateFavouriteChunks();
    } else await addToFavourite();
  };
  return (
    <div className={classes.ChunkFactCard}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isFavourite || props.isFavourite ? "red" : "black"}
        className={classes.AddToFavourite}
        onClick={toogleFavourite}
      >
        <path d="M12 4.435C10.011-.964 0-.162 0 8.003 0 12.071 3.06 17.484 12 23c8.94-5.516 12-10.929 12-14.997C24-.115 14-.996 12 4.435z"></path>
      </svg>
      <img
        className={classes.ChunkFactCardIcon}
        src={props.icon_url}
        alt="chunk icon"
      />
      {isFavourite || props.isFavourite ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          className={classes.Edit}
          onClick={() => setIsOpen(true)}
        >
          <path d="M22.828 3c-.512 0-1.023.195-1.414.586L19 6l5 5 2.414-2.414a2 2 0 000-2.828l-2.172-2.172A1.994 1.994 0 0022.828 3zM17 8L5.26 19.74s.918-.082 1.26.26c.342.342.06 2.58.48 3 .42.42 2.644.124 2.963.443.319.32.297 1.297.297 1.297L22 13l-5-5zM4 23l-.943 2.672A1 1 0 003 26a1 1 0 001 1 1 1 0 00.328-.057 1 1 0 00.01-.004l.025-.007a1 1 0 00.006-.004L7 26l-1.5-1.5L4 23z"></path>
        </svg>
      ) : null}
      <p className={classes.ChunkFactCardText}>{props.value}</p>
      <div id="modalApp">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 className="modal-header">Hello There</h2>
          <div className="modal-text">Please Enter Your Wanted Text:</div>
          <textarea
            name="chunkValue"
            onChange={handleTextChange}
            defaultValue={props.value}
            className="modal-input"
          ></textarea>
          <button className="modal-button" onClick={handleUpdateChunk}>
            submit
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default ChunkFactCard;
