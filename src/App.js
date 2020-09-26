import React , { useEffect, useState }from 'react';
import './App.css';
import Tmdb from  './Api/Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';


export default () => {

  //criando lista que serão exibidas
  const [movieList, setMovieList] = useState([]);

  //criando os filmes em destaques da tela
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(()=>{
    const loadAll = async () => {
      //Pegando a lista Total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando o filme em destaque
      let originals = list.filter(i=>i.slug === 'originals');
      let randowClosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randowClosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);      
      
    }
    loadAll();
  }, []);

  return(
    <div className="page">
      
      {featuredData && 
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow  key={key} 
            title={item.title}
            items={item.items}
          /> 
        ))}
      </section> 
    </div>
  );
}
