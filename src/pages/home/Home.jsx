import { projectFirestore } from "../../firebase/Config";
import RecipeList from "../../components/recipe/RecipeList";
import "./Home.css";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection('recipes').onSnapshot((snapshot) =>{
      if(snapshot.empty){
        setIsPending(false);
        setError('No Recipes to Load');
      }else{
        let results = [];
        snapshot.docs.forEach(doc => {
          results.push({id: doc.id, ...doc.data()});
        })
        setData(results);
        setIsPending(false);
      }
    }, (err) => {
      setError(err.message);
      setIsPending(false);
    });

    return () => unsub();
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
