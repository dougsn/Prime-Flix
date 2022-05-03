import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css'

import api from '../../services/api'

function Home() {

    //https://api.themoviedb.org/3/movie/now_playing?api_key=ebda08a010cfe98458e308d56a643804&language=pt-BR

    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)
    

    useEffect(()=> {

        async function loadFilmes() {
            // O parametro da api_key é required, sem eles não da para acessar os dados da API
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "ebda08a010cfe98458e308d56a643804",
                    language: "pt-BR"
                }
            })
            
            // O await não deixa o código seguir, até que as informações da API sejam capturadas.
            setFilmes(response.data.results.slice(0, 10)); // Pegando os 10 primeiros filmes.
            setLoading(false)
        }   
        


        
        
        loadFilmes();
    }, [filmes])

    if(loading) {
        return (
            <div>
                <h2 className="loading">Carregando filmes...</h2>
            </div>

        )
    }

    return (



        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title}></img>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;