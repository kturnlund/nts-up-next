import { useMemo } from "react";
import type { NTSBroadcastInfo } from "../../api/ntsTypes";
import './playingCard.css'

const NowPlayingCard = ({ cardInfo }: { cardInfo: NTSBroadcastInfo }) => {
    const startTime = useMemo(() => {
        return new Date(cardInfo?.start_timestamp).toLocaleTimeString()
    }, [cardInfo])

    const endDate = useMemo(() => {
        return new Date(cardInfo?.end_timestamp).toLocaleDateString();
    }, [cardInfo]);
    const startDate = useMemo(() => {
        const date = new Date(cardInfo?.start_timestamp).toLocaleDateString();
        if (date !== endDate) {
            return date;
        }
        else return '';

    }, [endDate, cardInfo])

    const endTime = useMemo(() => {
        return new Date(cardInfo?.end_timestamp).toLocaleTimeString()
    }, [cardInfo])
    return (
        <>
            {cardInfo?.embeds?.details.media.picture_medium_large &&
            
                    <img src={cardInfo?.embeds?.details.media?.picture_medium_large} className="artwork"/>
            }
            
            <div className='innerPlayingCard'>
                <div style={{ border: '2px solid #DDF8E8' }}>
                    <div style={{ padding: '5px' }}>

                        <h2 style={{ color: '#DDF8E8' }}>
                            {cardInfo?.broadcast_title}
                        </h2>
                            <h4 style={{ color: '#DDF8E8' }}>
                                {cardInfo?.embeds?.details.description}
                            </h4>
                        <h4 style={{ color: '#DDF8E8' }}>
                            Broadcast time: {startTime} {startDate} - {endTime} {endDate}
                        </h4>
                        <h5 style={{ color: '#DDF8E8' }}>
                            Genres: {cardInfo?.embeds?.details.genres.map((genre, idx) => {
                                return idx !== (cardInfo?.embeds?.details.genres.length ?? 0) - 1 ? genre.value + ',  ' : genre.value
                            })}
                        </h5>
                        <a href="https://www.nts.live" target="_blank" style={{color: '#DDF8E8'}}>
                            Listen on NTS
                        </a>
                    </div>
                </div>
            </div>
            </>
    )
}

export default NowPlayingCard;