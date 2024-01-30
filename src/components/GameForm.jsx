import { useContext, useState } from "react";
import classes from "../styles/GameForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";
import { GameContext } from "../providers/GameContext";
import { Autocomplete } from "@mantine/core";

const GameForm = ({ isUpdate = false }) => {
  const { requestWithToken } = useContext(AuthContext);
  const { categories } = useContext(GameContext);
  const { gameId } = useParams();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [developer, setDeveloper] = useState("");
  const [publisher, setPublisher] = useState("");
  const [releaseDate, setReleaseDate] = useState();
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagField, setTagField] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();

  const handleTagSelect = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    //doesnt clear field if its focussed

    setIsFocused(false);
    setTagField("");

    setTimeout(() => {
      setIsFocused(true);
    }, 10);
  };

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
        toast.success("successfully added game");
        navigate(`/games/${response.data._id}`);
      }
      if (response.status === 200) {
        toast.success("successfully udpated game");
        navigate(`/games/${response.data._id}`);
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
          Price in €(ex. 59.99 or 59,99)
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
      <label>
        Tags
        <Autocomplete
          value={tagField}
          onChange={(value) => setTagField(value)}
          data={["mmo", "action", "rpg"]}
          onOptionSubmit={(value) => handleTagSelect(value)}
          capture={isFocused}
        />
      </label>
      <button type="button" onClick={() => setTagField("")}>
        test empty field
      </button>
      <div>Selected Items: {tags.join(", ")}</div>
    </>
  );
};

export default GameForm;
