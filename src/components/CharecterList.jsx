"react";

import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

function CharecterList({ character, onSeclect, selectId }) {
  return (
    <div className="characters-list">
      {character.map((item) => (
        <Charecters
          key={item.id}
          item={item}
          onSeclect={onSeclect}
          selectId={selectId}
        >
          <button className="icon red">
            {item.id == selectId ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </Charecters>
      ))}
    </div>
  );
}

export default CharecterList;

export function Charecters({ item, onSeclect, selectId, children }) {
  return (
    <div className="list__item" onClick={() => onSeclect(item.id)}>
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender === "Male" ? "👱‍♂️" : "👩‍🦰"}</span>
        <span>{item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${item.status === "Dead" ? "red" : ""}`}
        ></span>
        <span className=""> {item.status}</span>
        <span className=""> - {item.species}</span>
      </div>
      {children}
    </div>
  );
}
