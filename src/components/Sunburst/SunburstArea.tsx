import { useContext, useEffect, useMemo, useRef, useState } from "react"
import SunburstChart from "./Sunburst"
import { NTSContext } from "../../api/NTSContext"
import { buildSunburstData } from "../../utils/utils";
import { animate } from "animejs";
import { createPortal } from 'react-dom';

const SunburstArea = () => {
    const sunburstRef = useRef<HTMLDivElement>(null)
    const { genres, activeGenres } = useContext(NTSContext);
    const [tooltip, setTooltip] = useState<{
        x: number
        y: number
        name: string
        color: string
    } | null>(null)

    const genreSunburstData = useMemo(() => {
        if (genres === null) {
            return []
        }
        else {
            return buildSunburstData({ genres, activeGenres: activeGenres ?? [] })
        }
    }, [genres, activeGenres]);


    useEffect(() => {
        if (!sunburstRef.current) return

        const animation = animate(sunburstRef.current, {
            rotate: '360deg',
            duration: 20000,
            easing: 'linear',
            loop: true,
            autoplay: true,
        })

        sunburstRef.current.addEventListener('mouseenter', () => animation.pause())
        sunburstRef.current.addEventListener('mouseleave', () => animation.play())
    }, [])


    return (<>
    <div style={{position: "relative", overflow: 'hidden', height: '100vh', width: 500, flexShrink: 0}}>
        <div style={{ position: 'absolute', left: '-450px' }}>
        <div style={{ height: 900, width: 900, transformOrigin: '50% 50%'}} ref={sunburstRef} onMouseMove={(e) => {
            if (tooltip) setTooltip(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)
        }}>
            <SunburstChart data={genreSunburstData} setTooltip={setTooltip} />
        </div>
        {tooltip && createPortal(
            <div style={{
                position: 'fixed',
                top: tooltip.y + 12,
                left: tooltip.x + 12,
                backgroundColor: "#DDF8E8",
                borderRight: `4px solid ${tooltip.color}`,
                padding: '4px',
                borderRadius: '2px',
                zIndex: 9999,
            }}>
                {tooltip.name}
            </div>,
            document.body
        )}
        </div>
        </div>
    </>
    
    )
}
export default SunburstArea;