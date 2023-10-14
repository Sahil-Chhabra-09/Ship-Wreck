import React, { useEffect, useState } from "react";
import axios from "axios";

function RenderScores() {
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getScoresFromDB();
  }, []);

  const getScoresFromDB = async () => {
    setIsLoading(true);
    await axios
      .get(`${apiUrl}/scores`)
      .then((res) => {
        setScores(res.data.scores);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {scores.map(({ userName, score, _id }) => {
        return (
          <div key={_id}>
            <span>{userName}</span>
            <span> </span>
            <span>{score}</span>
          </div>
        );
      })}
    </div>
  );
}

export default RenderScores;
