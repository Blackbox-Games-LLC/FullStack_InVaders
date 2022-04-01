import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchScore } from "../redux/scoreReducer";

export default function Scores() {
  const user = useSelector((state) => state.user);
  const scores = useSelector((state) => state.score);
  console.log("scoressss", scores);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      dispatch(fetchScore(user.id));
    }
  }, [user.id]);

  let orderedScores = []

  scores.forEach(element => {
    let num = element.level
    if (orderedScores[num]) {
      orderedScores[num].push(element)
    } else {
      orderedScores[num] = []
      orderedScores[num].push(element)
    }
    console.log(orderedScores)
  });

  return (
    <div className="test">
      <table>
        <thead>
          <tr>
            <th>Motherships Killed</th>
            <th>Aliens Killed</th>
            <th>Current Time</th>
          </tr>
        </thead>
        <tbody>
          {scores.length > 0 ? (
            scores.map((score) => {
              return (
                <tr>
                  <td>{score.motherships}</td>
                  <td>{score.aliens}</td>
                  <td>{score.time}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={3}>No score</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
