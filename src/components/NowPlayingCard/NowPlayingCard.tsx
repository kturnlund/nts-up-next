import { useMemo } from "react";
import type { NTSBroadcastInfo } from "../../api/ntsTypes";
import './playingCard.css'

const NowPlayingCard = ({ cardInfo }: { cardInfo: NTSBroadcastInfo }) => {
    const startTime = useMemo(() => {
        return new Date(cardInfo?.start_timestamp).toLocaleTimeString()
    }, [cardInfo])
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
                            Broadcast time: {startTime} - {endTime}
                        </h4>
                        <h5 style={{ color: '#DDF8E8' }}>
                            Genres: {cardInfo?.embeds?.details.genres.map((genre, idx) => {
                                return idx !== (cardInfo?.embeds?.details.genres.length ?? 0) - 1 ? genre.value + ',  ' : genre.value
                            })}
                        </h5>
                    </div>
                </div>
            </div>
            </>
    )
}

export default NowPlayingCard;