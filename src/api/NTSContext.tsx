import { createContext, useCallback, useMemo, useState, type FC, type ReactNode } from "react";
import type { NTSBroadcastInfo, NTSContextType } from "./ntsTypes";
import useNTSLive from "../hooks/useNTSLive";
import useGetNTSGenres from "../hooks/useGetNTSGenres";

export const NTSContext = createContext<NTSContextType | null>(null);

const NTSProvider: FC<{ children?: ReactNode | ReactNode[] }> = ({ children }) => {
    const [nowPlayingIndex, setNowPlayingIndex] = useState<number>(0);

    const { genres } = useGetNTSGenres();

    const { data, combinedEpisodeInfo } = useNTSLive({ poll: 30000 });


    const backTrack = useCallback(() => {
        setNowPlayingIndex((prev) => {
            if (prev === 0) {
                return combinedEpisodeInfo.length - 1;
            }
            else return prev - 1;
        })
    }, [combinedEpisodeInfo])

    const forwardTrack = useCallback(() => {
        setNowPlayingIndex((prev) => {
            if (prev === combinedEpisodeInfo.length - 1) {
                return 0;
            }
            else return prev + 1;
        })
    }, [combinedEpisodeInfo])

    const activeNowPlaying: NTSBroadcastInfo | null = useMemo(() => {
        if (combinedEpisodeInfo.length > 0) {
            return combinedEpisodeInfo[nowPlayingIndex]
        } else return null;
    }, [combinedEpisodeInfo, nowPlayingIndex])

    const activeGenres = useMemo(() => {
        if (combinedEpisodeInfo.length > 0) {
            return combinedEpisodeInfo[nowPlayingIndex].embeds?.details.genres?.map((genre) => genre.id.replace('genres-', ''))
        } else return [];
    }, [combinedEpisodeInfo, nowPlayingIndex])

    return (
        <NTSContext.Provider value={{
            data,
            combinedEpisodeInfo,
            genres,
            activeGenres,
            backTrack,
            forwardTrack,
            activeNowPlaying
        }}>
            {children}
        </NTSContext.Provider>
    )
}

export default NTSProvider;

