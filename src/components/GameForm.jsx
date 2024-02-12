import { useContext, useEffect, useRef, useState } from "react";
import classes from "../styles/GameForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";
import { GameContext } from "../providers/GameContext";
import { Autocomplete } from "@mantine/core";
import axios from "axios";

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
    if (tags.length >= 5) {
      toast.error("A game may only have 5 tags");
    } else if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    //doesnt clear field if its focussed

    if (autocompleteRef.current) {
      autocompleteRef.current.blur();
    }
    //refocus after clearing field to ensure accessibility
    setTimeout(() => {
      setTagField("");
      autocompleteRef.current.focus();
    }, 5);
  };

  const removeFromTagsArray = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const fetchGameToUpdate = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/games/${gameId}`
      );
      if (response.status === 200) {
        setTitle(response.data.title);
        setImageUrl(response.data.imageUrl);
        setDeveloper(response.data.developer);
        setPublisher(response.data.publisher);
        setReleaseDate(response.data.releaseDate);
        setPrice((response.data.price / 100).toFixed(2));
        setDiscountPercent(response.data.discountInPercent);
        setDescription(response.data.description);
        setTags(response.data.tags);
      }
    } catch (error) {
      toast.error("unable to fetch game to update");
    }
  };

  //helper function to transform entered price into Eur
  const formatPrice = (priceNum) => {
    //cases no ,. -> price * 100
    //, or . with 2 digits
    let formattedPrice;
    let finalPrice;
    const hasDecimals =
      priceNum.toString().includes(".") || priceNum.toString().includes(",");
    if (priceNum.toString().includes("."))
      formattedPrice = priceNum.toString().split(".");
    if (priceNum.toString().includes(","))
      formattedPrice = priceNum.toString().split(",");

    if (hasDecimals) {
      if (formattedPrice[1].length === 1) {
        finalPrice = +formattedPrice[0] * 100 + +formattedPrice[1] * 10;
      } else {
        finalPrice = +formattedPrice[0] * 100 + +formattedPrice[1].slice(0, 2);
      }
    } else {
      finalPrice = +priceNum * 100;
    }
    return finalPrice;
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
      discountInPercent: parseInt(discountPercent),
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

  useEffect(() => {
    if (isUpdate) fetchGameToUpdate();
  }, [gameId]);

  return (
    <>
      <h1 className={classes.formHeader}>{isUpdate ? "Update" : "Add"} game</h1>
      <form onSubmit={handleSubmit} className={classes.gameFormCtn}>
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
          Description
          <input
            type="text"
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
            className={classes.releaseInput}
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
        <div className={classes.tagsCtn}>
          {tags.map((tag) => {
            return (
              <div className={classes.tagsCard} key={tag}>
                {tag}{" "}
                <button
                  className={classes.removeTagBtn}
                  type="button"
                  onClick={() => removeFromTagsArray(tag)}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
        <label className={classes.tagsLabel}>
          Tags
          <div className={classes.autoCompleteInput}>
            <Autocomplete
              value={tagField}
              onChange={(value) => setTagField(value)}
              data={categories.filter((item) => !tags.includes(item))}
              onOptionSubmit={(value) => handleTagSelect(value)}
              ref={autocompleteRef}
            />
          </div>
        </label>
        <div className={classes.bottomBtns}>
          {" "}
          <input
            className={classes.submitBtn}
            type="submit"
            value={isUpdate ? "Update Game" : "Add Game"}
          />
          <button
            className={classes.cancelBtn}
            type="button"
            onClick={() =>
              navigate(`${isUpdate ? `/games/${gameId}` : "/dashboard/dev"}`)
            }
          >
            Cancel
          </button>
        </div>
      </form>
      <div className={classes.marginBottom}></div>
    </>
  );
};

export default GameForm;
