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

    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("No recipe found");
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [])
  

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
          <img className="arrowBack" src={arrowIcon} alt="Atras" onClick={history.goBack} />
        </>
      )}
    </div>
  );
};

export default Recipe;
