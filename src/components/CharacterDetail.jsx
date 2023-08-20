import { useEffect, useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "./Loader";

function CharacterDetail({ selectId, onFavourite, isAddCharacter }) {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectId}`
        );
        setCharacter(data);

        const episodeData = data.episode.map((e) => e.split("/").at(-1));
        const episode = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeData}`
        );
        setEpisodes([episode.data].flat().slice(0, 9));
      } catch (error) {
        console.log(error);
        // toast.error(error.response.data.error)
      } finally {
        setIsLoading(false);
      }
    }
    if (selectId) getData();
  }, [selectId]);

  if (isLoading) {
    return (
      <h1 style={{ color: "#f6f6f6", flex: 1, textAlign: "center" }}>
        <Loader />
      </h1>
    );
  }

  if (!character || !selectId)
    return (
      <h1 style={{ color: "#f6f6f6", flex: 1, textAlign: "center" }}>
        Please select the Character
      </h1>
    );

  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img
          src={character.image}
          alt={character.name}
          className="character-detail__img"
        />
        <div className="character-detail__info">
          <h3 className="name">
            <span>{character.gender === "Male" ? "👨" : "👩"} </span>
            <span> {character.name}</span>
          </h3>

          <div className="info">
            <span
              className={`status ${character.status === "Dead" && "red"}`}
            ></span>
            <span> {character.status}</span>
            <span> - {character.species}</span>
          </div>

          <div className="location">
            <p>Last known Location :</p>
            <p>{character.location.name}</p>
          </div>

          <div className="actions">
            {isAddCharacter ? (
              <p style={{ color: "#999" }}>added to favourites ✅</p>
            ) : (
              <button
                className="btn btn--primary"
                onClick={() => onFavourite(character)}
              >
                Add to Favorit
              </button>
            )}
          </div>
        </div>
      </div>

      <Episode episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;

function Episode({ episodes }) {
  const [sort, setSort] = useState(true);
  let sortedEpisode;
  if (sort) {
    sortedEpisode = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisode = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List Of Episodes: </h2>
        <button onClick={() => setSort((is) => !is)}>
          <ArrowUpCircleIcon className="icon" style={{rotate: !sort && "180deg"}} />
        </button>
      </div>
      <ul>
        {sortedEpisode.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")}-{item.episode}
            </div>
            <div className="badge badeg--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
