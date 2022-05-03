import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from "../../services/api"
import './filme.css'

function Filme() {

    const { id } = useParams(); // o parametro tem que ser igual ao que foi passado na rota (/filmes/:id)
    const navigate = useNavigate();
    const [filme, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        async function loadFilme(){
           await api.get(`movie/${id}`, {
                params: {
                    api_key: "ebda08a010cfe98458e308d56a643804",
                    language: "pt-BR"
                }
            })
            .then((response)=>{
                 setFilmes(response.data);
                 setLoading(false)
            })
            .catch(()=>{
                navigate('/', { replace: true })
                return;
            })
        }
        loadFilme()

        return () => {
            
        }


    }, [navigate, id])

    function salvarFilme() {
        // Pegando as informações do localStorage
        const filmeStorage = localStorage.getItem('@primeFlix')

        // Convertendo a informação do localStorage, e se não tiver nada, é atribuido um array vazio.
        let filmesSalvos = JSON.parse(filmeStorage) || []

        // Verificando se no localStorage já possui o filme, que foi comparado com a ID da API
        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        // Se já tiver o filme, não deixa salvar e dá um alerta
        if(hasFilme) {
            
            toast.warn("Esse filme já está na lista")
            return;
        }

        // Se o filme não estiver na lista, ele é atribuido ao array dos filmes salvos.
        filmesSalvos.push(filme);

        // E posteriormente é salvo no localStorage com a sua devida conversão para JSON
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos))

        toast.success("Filme salvo com sucesso !")
        

    }

    if(loading) {
        return(
            <div>
                <h1 className='filme-info'>Carregando detalhes ...</h1>
            </div>
        )
    }
    return (
        <div className='filme-info'>
        <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title}></img>

        <h3>Sinopse</h3>
        <span>{filme.overview}</span>

        <strong>Avaliação: {filme.vote_average} / 10</strong>

        <div className='area-buttons'>
            <button onClick={salvarFilme}>Salvar</button>
            <button>
                <a target='blank' rel='external' href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
            </button>
        </div>

        </div>
    )
}

export default Filme;