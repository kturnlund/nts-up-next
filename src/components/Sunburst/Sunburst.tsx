import { Sunburst } from '@nivo/sunburst'

const SunburstChart = ({ data, setTooltip }) => {



    return (
        <Sunburst data={data}
        width={900}
        height={900}
            inheritColorFromParent={false}
            colors={(node) => node.data.color}
            arcLabel={(node) => node.data.name}
            tooltip={() => null}
          onMouseEnter={(node, event) => setTooltip({
            x: event.clientX,
            y: event.clientY,
            name: node.data.name,
            color: node.color,
          })}
          borderColor={'#DDF8E8'}
          onMouseLeave={() => setTooltip(null)}
        />
    )
}

export default SunburstChart;