import { useState, useEffect } from "react";
import axios from "axios";
import "./Game.css";

const Game = () => {
  const [clickPosition, setClickPosition] = useState(null);
  const [selectedObject, setSelectedObject] = useState("");
  const [objects, setObjects] = useState([
    { name: "Frog", found: false },
    { name: "Duck", found: false },
    { name: "Violin", found: false },
  ]);
  const [markers, setMarkers] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  

  // Start timer on load
  useEffect(() => {
    setStartTime(Date.now());
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch leaderboard
  useEffect(() => {
    axios.get("http://localhost:3000/scores").then((res) => setLeaderboard(res.data));
  }, []);

  const handleImageClick = (e) => {
    const img = e.target;
    const rect = img.getBoundingClientRect();
  
    // Convert click to percentage-based coordinates (normalized)
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
  
    console.log("🖱 Clicked Coordinates:", { x, y }); // Debug
  
    setClickPosition({ x, y });
  };
  
  const handleSelect = async () => {
    if (!selectedObject) return;
  
    const response = await axios.post("http://localhost:3000/validate_click", {
      name: selectedObject,
      x: clickPosition.x,
      y: clickPosition.y,
    });
  
    console.log("Server Response:", response.data); // Debug log
  
    if (response.data.success) {
      setObjects((prevObjects) =>
        prevObjects.map((obj) =>
          obj.name === selectedObject ? { ...obj, found: true } : obj
        )
      );
  
      setMarkers((prevMarkers) => [...prevMarkers, { x: clickPosition.x, y: clickPosition.y, name: selectedObject }]);
      setFoundCount((prevCount) => prevCount + 1);
    } else {
      alert("Incorrect selection! Try again.");
    }
  
    setClickPosition(null);
  };
  

  const handleFinish = async () => {
    const playerName = prompt("Enter your name:");
    if (!playerName) return;

    await axios.post("http://localhost:3000/scores", {
      player_name: playerName,
      time: elapsedTime,
    });

    alert("Score saved!");
    window.location.reload(); // Restart the game
  };

  return (
    <div className="game-container">
      <h1>Find the Objects</h1>
      <p>Time: {elapsedTime} seconds</p>
      <p>{foundCount}/{objects.length} objects found</p>
      
      <ul>
  {objects.map((obj) => (
    <li key={obj.name} className={obj.found ? "found" : ""}>
      {obj.name} {obj.found && "✅"}
    </li>
  ))}
</ul>



      <div className="image-container">
        <img
          src="/image.jpg"
          alt="Hidden Objects"
          className="game-image"
          onClick={handleImageClick}
        />

        {markers.map((marker, index) => (
          <div
            key={index}
            className="marker"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
          >
            ✅
          </div>
        ))}
      </div>

      {clickPosition && (
        <div
          className="target-box"
          style={{ left: `${clickPosition.x}%`, top: `${clickPosition.y}%` }}
        >
          <select onChange={(e) => setSelectedObject(e.target.value)}>
            <option value="">Select Object</option>
            {objects
              .filter((obj) => !obj.found)
              .map((obj) => (
                <option key={obj.name} value={obj.name}>
                  {obj.name}
                </option>
              ))}
          </select>
          <button onClick={handleSelect}>Check</button>
        </div>
      )}

      {foundCount === objects.length && <button onClick={handleFinish}>Submit Score</button>}

      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((score, index) => (
          <li key={index}>
            {score.player_name}: {score.time} sec
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Game;
