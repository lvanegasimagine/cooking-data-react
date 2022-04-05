import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { projectFirestore } from "../../firebase/Config";

import { useTheme } from "../../hooks/useTheme";
import arrowIcon from "../../assets/arrow-back.svg";
import "./Recipe.css";

const Recipe = () => {
  const { id } = useParams();
  const history = useHistory();
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("No recipe found");
        }
      }, (err) => {
        setError(err.message);
        setIsPending(false);
      });
     

    return () => unsub();
  }, [id]);

  const handleClick = () => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "Actualizado papus",
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <div className="">
            <button onClick={handleClick}>Update me</button>
            <img
              className="arrowBack"
              src={arrowIcon}
              alt="Atras"
              onClick={history.goBack}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Recipe;
