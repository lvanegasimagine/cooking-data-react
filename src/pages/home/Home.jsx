import { projectFirestore } from "../../firebase/Config";
import RecipeList from "../../components/recipe/RecipeList";
import "./Home.css";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    projectFirestore
      .collection("recipes")
      .get()
      .then((snapshot) => {
       if(snapshot.empty){
         setError('No recipes to load');
         setIsPending(false);
       }else{
          const result = [];
          snapshot.forEach((doc) => {
            result.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setData(result);
          setIsPending(false);
       }
      }).catch((err => {
        setError(err.message);
        setIsPending(false);
      }));
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading....</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Home;
