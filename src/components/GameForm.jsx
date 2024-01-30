import { useContext, useState } from "react";
import classes from "../styles/GameForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";

const GameForm = ({ isUpdate = false }) => {
  const { requestWithToken } = useContext(AuthContext);
  const { gameId } = useParams();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [developer, setDeveloper] = useState("");
  const [publisher, setPublisher] = useState("");
  const [releaseDate, setReleaseDate] = useState();
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    //image url is an array of strings, first element is the thumbnail image
    const payload = {
      title,
      imageUrl,
      developer,
      publisher,
      releaseDate,
      price,
      description,
      //update how tags are handled to allow for multiple tags
      tags: [tags],
    };
    try {
      const response = await requestWithToken(
        `/games${isUpdate ? `/${gameId}` : ""}`,
        isUpdate ? "PUT" : "POST",
        payload
      );
      if (response.status === 201) {
        console.log(
          "successfully created game - REPLACE THIS WITH ACTUAL CODE"
        );
      }
      if (response.status === 200) {
        console.log("successfully updated game - REPLACE WITH ACTUAL CODE");
      }
    } catch (error) {
      toast.error(
        `Error occured while ${isUpdate ? "updating" : "adding"} game!`
      );
    }
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
        <label>
          Category/Tags/change to input and handle as array
          <input
            type="text"
            required
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
        </label>
        <input type="submit" value={isUpdate ? "Update Game" : "Add Game"} />
      </form>
    </>
  );
};

export default GameForm;
