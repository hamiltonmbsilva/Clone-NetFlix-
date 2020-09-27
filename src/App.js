import React , { useEffect, useState }from 'react';
import './App.css';
import Tmdb from  './Api/Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';


export default () => {

  //criando lista que serão exibidas
  const [movieList, setMovieList] = useState([]);

  //criando os filmes em destaques da tela
  const [featuredData, setFeaturedData] = useState(null);

  //vai defenir ser vai aparecer ou não backgroud preto do topo
  const [blackHeader, setBlackHeader] = useState(false);

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

  useEffect(()=>{
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true)
      }else{
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);

    return() =>{
      window.removeEventListener('scroll', scrollListener);
    }

  }, []);

  return(
    <div className="page">

      <Header black={blackHeader}/>
      
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
