import "./App.css";
import Navbar, {
  FavouriteButton,
  ResultCharacter,
  Search,
} from "./components/Navbar";
import CharecterList from "./components/CharecterList";
import CharacterDetail from "./components/CharacterDetail";
import { character } from "../data/data";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState(character);
  const [query, setQuery] = useState("");
  const [selectId, setSelectId] = useState(null);
  const [favourites, setFavourites] = useState(
    () => JSON.parse(localStorage.getItem("Favourite")) || []
  );

  console.log(favourites);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        setCharacters(data.results.slice(0, 13).slice(0, 6));
      } catch (error) {
        setCharacters([]);
        toast.error(error.response.data.error);
      }
    };
    getData();
  }, [query]);

  useEffect(() => {
    localStorage.setItem("Favourite", JSON.stringify(favourites));
  }, [favourites]);

  const seclectHndler = (id) => {
    setSelectId((prevId) => (prevId === id ? null : id));
  };

  const favouriteHandler = (char) => {
    setFavourites((prev) => [...prev, char]);
  };
  const removeFavouriteHandler = (id) => {
    setFavourites(favourites.filter((f) => f.id !== id));
  };

  const isAddCharacter = favourites.map((i) => i.id).includes(selectId);

  return (
    <div>
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <ResultCharacter numOfCharacter={characters} />
        <FavouriteButton
          favourites={favourites}
          onRemove={removeFavouriteHandler}
        />
      </Navbar>

      <Main>
        <CharecterList
          character={characters}
          onSeclect={seclectHndler}
          selectId={selectId}
        />

        <CharacterDetail
          selectId={selectId}
          onFavourite={favouriteHandler}
          isAddCharacter={isAddCharacter}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <main className="main">{children}</main>;
}
