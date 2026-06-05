import type { Genre } from "../api/ntsTypes";

export const buildSunburstData = ({ genres, activeGenres }: { genres: Genre[], activeGenres: string[] }) => {
    const setOfActiveGenres = new Set(activeGenres);
    return {
        id: 'root',
        children: genres.map((item) => {
            const isActiveGenre = item.subgenres.map((subitem) => subitem.id).some(genre => setOfActiveGenres.has(genre))
            return {
                id: item.id,
                name: item.name,
                color: isActiveGenre ? '#BF0603' : '#32213A',
                value: item.subgenres.length,
                children: item.subgenres.map((subitem) => {
                    return {
                        id: subitem.id,
                        name: subitem.name,
                        color: setOfActiveGenres.has(subitem.id) ? '#BF0603' : '#32213A',
                        value: 100,
                    }
                })
            }
        })
    }
}