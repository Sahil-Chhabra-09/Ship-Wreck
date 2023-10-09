import React, { useEffect, useState } from "react";
import axios from "axios";

function RenderScores() {
  const [scores, setScores] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getScoresFromDB();
  }, []);

  const getScoresFromDB = async () => {
    await axios.get(`${apiUrl}/scores`).then((res) => {
      setScores(res.data.scores);
    });
  };
  return (
    <div>
      {scores.map(({ userName, score, _id }) => {
        return (
          <>
            <div key={_id}>
              <span>{userName}</span>
              <span> </span>
              <span>{score}</span>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default RenderScores;
