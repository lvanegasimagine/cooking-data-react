import { useParams, useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";
import arrowIcon from "../../assets/arrow-back.svg";
import "./Recipe.css";

const Recipe = () => {
  const { id } = useParams();
  const history = useHistory();
  const url = `http://localhost:3000/recipes/${id}`;
  const { data: recipe, isPending, error } = useFetch(url);
  const { mode } = useTheme();

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
