
export type MidFlightState<T> =
    | { status: 'success', data: T, timestamp: Date }
    | { status: 'error', error: Error, oldData?: T }
    | { status: 'idle' }
    | { status: 'fetching' }

export type NTSLink = {
    rel: string,
    href: string,
    type: string,
}

export type Genre = {
    id: string,
    name: string,
    subgenres: {
        id: string,
        name: string
    }[]
}

export type NTSBroadcastEmbed = {
    status: string,
    updated: Date,
    name: string,
    description: string,
    description_html: string,
    external_links: string[],
    moods: {
        id: string,
        value: string
    }[],
    genres: {
        id: string,
        value: string
    }[],
    location_short: string,
    location_long: string,
    intensity: string,
    media: {
        background_large: string,
        background_medium_large: string,
        background_medium: string,
        background_small: string,
        background_thumb: string,
        picture_large: string,
        picture_medium_large: string,
        picture_medium: string,
        picture_small: string,
        picture_thumb: string
    },
    episode_alias: string,
    show_alias: string,
    broadcast: Date,
    mixcloud: string,
    audio_sources: [
        {
            url: string,
            source: string
        }
    ],
    brand: unknown,
    embeds?: unknown,
    links: NTSLink[]
}

export type NTSBroadcastInfo = {
    broadcast_title: string,
    start_timestamp: string,
    end_timestamp: string,
    embeds?: {
        details: NTSBroadcastEmbed,
    },
    links: NTSLink[],
}

export type NTSLiveResponseItem = {
    channel_name: string,
    now: NTSBroadcastInfo,
    next: NTSBroadcastInfo,
    next2: NTSBroadcastInfo,
    next3: NTSBroadcastInfo,
    next4: NTSBroadcastInfo,
    next5: NTSBroadcastInfo,
    next6: NTSBroadcastInfo,
    next7: NTSBroadcastInfo,
    next8: NTSBroadcastInfo,
    next9: NTSBroadcastInfo,
    next10: NTSBroadcastInfo,
    next11: NTSBroadcastInfo,
    next12: NTSBroadcastInfo,
    next13: NTSBroadcastInfo,
    next14: NTSBroadcastInfo,
    next15: NTSBroadcastInfo,
    next16: NTSBroadcastInfo,
    next17: NTSBroadcastInfo,
};


export type NTSLiveResponse = {
    results: NTSLiveResponseItem[],
    links: NTSLink[],
}

export type NTSGenresResponse = {
    results: Genre[],
    links: NTSLink[]
}

export type NTSContextType = {
    data: MidFlightState<NTSLiveResponse>;
    combinedEpisodeInfo: NTSBroadcastInfo[];
    genres: Genre[] | null;
    activeNowPlaying: NTSBroadcastInfo ;
    activeGenres?: string[]; 
    backTrack: () => void,
    forwardTrack: () => void,
}