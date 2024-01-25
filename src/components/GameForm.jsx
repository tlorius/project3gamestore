import { useState } from "react";
import classes from "../styles/GameForm.module.css";
import { useParams } from "react-router-dom";

const GameForm = ({ isUpdate = false }) => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [developer, setDeveloper] = useState("");
  const [publisher, setPublisher] = useState("");
  const [releaseDate, setReleaseDate] = useState();
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const { gameId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      title,
      imageUrl,
      developer,
      publisher,
      releaseDate,
      price,
      description,
    };
  };

  return (
    <>
      <h2>Form to {isUpdate ? "update" : "add"} game</h2>
      <form onSubmit={handleSubmit} className={classes.formCtn}>
        <label>
          Title
          <input
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Image
          <input
            type="url"
            required
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
          />
        </label>
        <label>
          Developer
          <input
            type="text"
            required
            value={developer}
            onChange={(event) => setDeveloper(event.target.value)}
          />
        </label>
        <label>
          Publisher
          <input
            type="text"
            required
            value={publisher}
            onChange={(event) => setPublisher(event.target.value)}
          />
        </label>
        <label>
          Release Date
          <input
            type="date"
            required
            value={releaseDate}
            onChange={(event) => setReleaseDate(event.target.value)}
          />
        </label>
        <label>
          Price
          <input
            type="number"
            required
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <input type="submit" value={isUpdate ? "Update Game" : "Add Game"} />
      </form>
    </>
  );
};

export default GameForm;
