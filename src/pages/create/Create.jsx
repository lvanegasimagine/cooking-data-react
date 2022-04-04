import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import "./Create.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const {postData, data, error} = useFetch('http://localhost:3000/recipes', 'POST');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({title, ingredients, method, cookingTime: cookingTime + ' minutes' });
  };

  const handleAddIngredients = (e) =>{
    const ing = newIngredient.trim();

    if(ing && !ingredients.includes(ing)){
      setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }
    setNewIngredient('');
    ingredientInput.current.focus();
  }

  // Redirect
  useEffect(() => {
    if(data){
      history.push('/');
    }
  }, [data])
  
  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Recipe title">
          <span>Recipe Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label htmlFor="Ingredients">
          <span>Recipe Ingredients: </span>
          <div className="ingredients">
            <input type="text" onChange={(e) => setNewIngredient(e.target.value)} value={newIngredient} ref={ingredientInput} />
            <button className="btn" type="button" onClick={handleAddIngredients}>Add</button>
          </div>
        </label>
        <p>Current Ingredients: {ingredients.map(i => <em key={i}>{i}, </em> )}</p>
        <label htmlFor="Recipe Method">
          <span> Recipe Method: </span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label htmlFor="Cooking Time">
          <span>Cooking Time (minutes): </span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">Save</button>
      </form>
    </div>
  );
};

export default Create;
