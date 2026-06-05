import { useContext } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { NTSContext } from "../../api/NTSContext";
import NowPlayingCard from "./NowPlayingCard";
import "./playingCard.css"
import { default_empty_broadcast_info } from "../../api/ntsTypes";

const NowPlayingCardArea = () => {
    const { activeNowPlaying, backTrack, forwardTrack } = useContext(NTSContext)  ?? {};

    return (
        <div className='playingCardArea'>
            <div>
                <NowPlayingCard cardInfo={activeNowPlaying ?? default_empty_broadcast_info} />
                <div className="playingCardControls">
                    <div className='playingCardButton'>
                        <button id='backtrack' onClick={backTrack} style={{ border: '2px solid #DDF8E8', backgroundColor: "inherit", color: 'inherit' }}>
                            <IconChevronLeft />
                        </button>
                    </div>
                    <div>
                        <div className='playingCardButton'>
                            <button id='forwardtrack' onClick={forwardTrack} style={{ border: '2px solid #DDF8E8', backgroundColor: "inherit", color: 'inherit' }}>
                                <IconChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NowPlayingCardArea;