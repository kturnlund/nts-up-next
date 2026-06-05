// master list of genres from NTS

import { useEffect, useState } from "react";
import type { Genre } from "../api/ntsTypes";
import { getNTSGenres } from "../api/nts";

const useGetNTSGenres = () => {
    const [genres, setGenres] = useState<Genre[] | null>(null);

    useEffect(() => {
        const abort = new AbortController;
        getNTSGenres({signal: abort.signal}).then((response) => setGenres(response.results))
        return () => abort.abort();
    }, [])

    return {genres};
}

export default useGetNTSGenres;