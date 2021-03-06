import { useState, useEffect } from 'react';
import { MovieState } from '../types';
import API from '../API';

//helpers
import { isPersistedState } from '../helpers';

const initialState = {
    movie: {},
    directors: [],
    actors: []
}

export const useMovieFetch = (movieId: string) => {
    const [state, setState] = useState<MovieState | {}>(initialState)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try{
                setLoading(true);
                setError(false);
                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);
                
                //get directors only
                const directors = credits.crew.filter(member => member.job === 'Director');

                setState({
                    ...movie,
                    actors: credits.cast,
                    directors
                })

                setLoading(false);
            }catch{
                setError(true);
            }
        };

        const sessionState = isPersistedState(movieId);
        
        if(sessionState) {
            setState(sessionState);
            setLoading(false);
            return;
        }

        fetchMovie();
    }, [movieId]);

    //write to session storage
    useEffect(() =>{
        sessionStorage.setItem(movieId, JSON.stringify(state))
    }, [movieId, state])

    return { state, loading, error };
}