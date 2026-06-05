import type { NTSLiveResponse } from "./ntsTypes";

const NTSApiBaseUrl = 'https://www.nts.live/api/v2';

const getNTSGenres = async ({signal}: {signal: AbortSignal}) => {
    const request = new Request(`${NTSApiBaseUrl}/genres`, {
        method: 'GET'
    })

    const results = await fetch(request, {signal}).then((response) => response.json());
    return results;
}

const getNTSLive = async ({signal}: {signal: AbortSignal}) => {
    const request = new Request(`${NTSApiBaseUrl}/live`, {
        method: 'GET'
    })

    const response = await fetch(request, {signal}).then((response) => {return response.json()});
    return response as NTSLiveResponse;
}

const getNTSEpisodeInfo = async ({ listOfShows, signal }: {listOfShows: string[]; signal: AbortSignal}) => {
    const requests = listOfShows.map((show) => (fetch(show, {
        method: 'GET',
        signal
    })))

    const responses = await Promise.all(requests);
    const data = await Promise.all(responses.map((response) => response.json()));
    return data;
}

export {
    getNTSEpisodeInfo,
    getNTSGenres,
    getNTSLive
}