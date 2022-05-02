import { useEffect, useState } from 'react';

import api from '../../services/api'

function Home() {

    //https://api.themoviedb.org/3/movie/now_playing?api_key=ebda08a010cfe98458e308d56a643804&language=pt-BR

    const [filmes, setFilmes] = useState([])

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
            setFilmes(response.data.results);
        }   
        loadFilmes();

    }, [filmes])

    return (



        <div>
            <h1>Bem vindo a Home</h1>
        </div>
    )
}

export default Home;