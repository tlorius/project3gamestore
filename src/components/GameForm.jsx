import { useContext, useRef, useState } from "react";
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
  const [discountPercent, setDiscountPercent] = useState(0);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagField, setTagField] = useState("");

  const navigate = useNavigate();
  const autocompleteRef = useRef(null);

  const handleTagSelect = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    //doesnt clear field if its focussed

    if (autocompleteRef.current) {
      autocompleteRef.current.blur();
    }
    setTimeout(() => {
      setTagField("");
      autocompleteRef.current.focus();
    }, 5);
  };

  const removeFromTagsArray = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  //helper function to transform entered price into Eur
  const formatPrice = (priceNum) => {
    //cases no ,. -> price * 100
    //, or . with 2 digits
    let formattedPrice;
    const hasDecimals = priceNum.includes(".") || priceNum.includes(",");
    if (priceNum.includes(".")) formattedPrice = priceNum.split(".");

    if (priceNum.includes(",")) formattedPrice = priceNum.split(",");
    console.log(hasDecimals, formattedPrice);
    return priceNum;
  };

  const testpayload = () => {
    const payload = {
      title,
      imageUrl,
      developer,
      publisher,
      releaseDate,
      price: formatPrice(price),
      description,
      tags,
      discountPercent: parseInt(discountPercent),
    };
    console.log(payload);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      title,
      imageUrl,
      developer,
      publisher,
      releaseDate,
      price: formatPrice(price),
      description,
      tags,
      discountPercent: parseInt(discountPercent),
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
          Price in €(ex. 59.99 or 59,9 or 60)
          <input
            type="number"
            required
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
        <label>
          Discount in %
          <input
            type="number"
            value={discountPercent}
            onChange={(event) => setDiscountPercent(event.target.value)}
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
      <div>
        Selected Items:{" "}
        <div className={classes.tagsCtn}>
          {tags.map((tag) => {
            return (
              <div className={classes.tagsCard} key={tag}>
                {tag}{" "}
                <button type="button" onClick={() => removeFromTagsArray(tag)}>
                  x
                </button>
              </div>
            );
          })}
        </div>
        <label>
          Tags
          <Autocomplete
            value={tagField}
            onChange={(value) => setTagField(value)}
            data={categories}
            onOptionSubmit={(value) => handleTagSelect(value)}
            ref={autocompleteRef}
          />
        </label>
        <button type="button" onClick={testpayload}>
          test payload
        </button>
      </div>
    </>
  );
};

export default GameForm;
