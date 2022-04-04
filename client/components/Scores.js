import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchScore } from "../redux/scoreReducer";

export default function Scores() {
  const user = useSelector((state) => state.user);
  const scores = useSelector((state) => state.score);
  // console.log("scoressss", scores);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      dispatch(fetchScore(user.id));
    }
  }, [user.id]);

  let orderedScores = [];
  const levels = {
    1: "Earth",
    2: "Mercury",
    3: "Venus",
    4: "Mars",
    5: "Jupiter",
    6: "Saturn",
    7: "Uranus",
    8: "Neptune",
    9: "Pluto"
  }

  scores.forEach((element) => {
    let num = element.level;
    if (orderedScores[num]) {
      orderedScores[num].push(element);
    } else {
      orderedScores[num] = [];
      orderedScores[num].push(element);
    }
    console.log(orderedScores);
  });

  return (
    <div className="test">
      {orderedScores.map((level, idx) => {
        console.log(level);
        if (level !== null) {
          return (
            <div className="text-center" key={idx}>
              <h3>{levels[idx]}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Motherships Killed |</th>
                    <th>Aliens Killed |</th>
                    <th>Win/Loss</th>
                  </tr>
                </thead>
                <tbody className="data">
                  {level.map((score, idj) => {
                    return (
                      <tr key={idj}>
                        <td>{score.motherships}</td>
                        <td>{score.aliens}</td>
                        <td>{score.winOrLoss ? "Win" : "Loss"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
      })}
    </div>
  );
}
