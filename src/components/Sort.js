import { useState } from "react";
import down from "../assets/angle-down-solid.svg";

const Sort = ({ occasions, onSort }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const genres = [...new Set(occasions.map((occasion) => occasion.genre))];
  const dates = [...new Set(occasions.map((occasion) => occasion.date))];
  const locations = [
    ...new Set(occasions.map((occasion) => occasion.location)),
  ];

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    onSort({
      genre: e.target.value,
      date: selectedDate,
      location: selectedLocation,
    });
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    onSort({
      genre: selectedGenre,
      date: e.target.value,
      location: selectedLocation,
    });
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    onSort({
      genre: selectedGenre,
      date: selectedDate,
      location: e.target.value,
    });
  };

  return (
    <div className="sort">
      <div className="sort__select">
        <p>Genre</p>
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <img src={down} alt="Dropdown" />
      </div>
      <div className="sort__select">
        <p>Dates</p>
        <select value={selectedDate} onChange={handleDateChange}>
          <option value="">All</option>
          {dates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
        <img src={down} alt="Dropdown" />
      </div>
      <div className="sort__select">
        <p>Location</p>
        <select value={selectedLocation} onChange={handleLocationChange}>
          <option value="">All</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <img src={down} alt="Dropdown" />
      </div>
    </div>
  );
};

export default Sort;
