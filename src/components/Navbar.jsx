import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import CharacterDetail from "./CharacterDetail";
import CharecterList, { Charecters } from "./CharecterList";
import { useState } from "react";

function Navbar({ children, favourites }) {
  return (
    <div className="navbar">
      <div className="navbar__logo">logo</div>
      {children}
    </div>
  );
}

export default Navbar;

export function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      vlaue={query}
      onChange={(e) => setQuery(e.target.value)}
      className="text-field"
      placeholder="search character"
    />
  );
}
export function ResultCharacter({ numOfCharacter }) {
  return (
    <div className="navbar__result">
      Found {numOfCharacter.length} Characters
    </div>
  );
}

export function FavouriteButton({ favourites, onRemove }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal title="Favourte Character" onOpen={setIsOpen} open={isOpen}>
        {favourites.map((item) => (
          <Charecters key={item.id} item={item} onSeclect={()=>{}}  >
          <button onClick={()=>onRemove(item.id)} className="icon red"><TrashIcon /></button>

          </Charecters>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen(true)}>
        <HeartIcon className="icon" />
        {favourites.length ? (
          <span className="badge">{favourites.length}</span>
        ) : (
          ""
        )}
      </button>
    </>
  );
}
