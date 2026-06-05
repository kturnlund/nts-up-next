// endpoint will change frequently with time, needs polling 

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { type NTSBroadcastEmbed, type MidFlightState, type NTSLiveResponse } from "../api/ntsTypes";
import { getNTSEpisodeInfo, getNTSLive } from "../api/nts";

const useNTSLive = ({ poll }: { poll: number }) => {
    const abortRef = useRef<AbortController | null>(null);
    const [liveData, setLiveData] = useState<MidFlightState<NTSLiveResponse>>({ status: 'idle' });
    const [episodeInfo, setEpisodeInfo] = useState<NTSBroadcastEmbed[] | null>(null);

    const fetchNTSLiveData = useCallback(async () => {
        abortRef.current?.abort();
        const abort = new AbortController();
        abortRef.current = abort;

        setLiveData(prev =>
            prev.status === 'success' ? prev : { status: 'fetching' }
        );

        try {
            const data = await getNTSLive({ signal: abort.signal });
            if (abort.signal.aborted) return;
            setLiveData({ status: 'success', data, timestamp: new Date() });
        } catch (err) {
            if (err instanceof DOMException && err.name === 'AbortError') return;
            const error = err instanceof Error ? err : new Error(String(err));
            setLiveData(prev => ({
                status: 'error',
                error,
                oldData: prev.status === 'success' ? prev.data : undefined,
            }));
        }
    }, [])

    const fetchEpisodeInfo = useCallback(async (data: NTSLiveResponse) => {
        abortRef.current?.abort();
        const abort = new AbortController();
        abortRef.current = abort;

        const episodeInfoLinks = Object.entries(data.results[0]).map(([key, value]) => {
            if (key === 'channel_name' || key === 'now' || key === 'next' || typeof value === 'string') {
                return;
            }
            else return value.links.find((link) => link.rel === 'details')?.href;
        }).filter(item => item !== undefined);

        try {
            const data = await getNTSEpisodeInfo({ listOfShows: episodeInfoLinks, signal: abort.signal });
            if (abort.signal.aborted) return;
            setEpisodeInfo(data);
        } catch (err) {
            if (err instanceof DOMException && err.name === 'AbortError') return;
        }

    }, [])

    useEffect(() => {
        fetchNTSLiveData();

        const pollId = setInterval(fetchNTSLiveData, poll)

        return () => {
            clearInterval(pollId);
            abortRef.current?.abort();
        };
    }, [])

    useEffect(() => {
        if (liveData.status === 'success') {
            fetchEpisodeInfo(liveData.data);
        }
    }, [liveData])

    const combinedEpisodeInfo = useMemo(() => {
        if (liveData.status === 'success' && episodeInfo !== null) {
            return Object.entries(liveData.data.results[0]).map(([key, value], index) => {
                if (typeof value === 'string') {
                    return null
                }
                if (key === 'now' || key === 'next') {
                    return value
                    
                }
                return {
                    ...value,
                    embeds: {
                    details: episodeInfo[index - 3]
                    }
                }
            }).filter((item) => item !== null)
        }
        else return [];
    }, [liveData, episodeInfo])



    return {
        data: liveData,
        combinedEpisodeInfo
    };
}

export default useNTSLive;