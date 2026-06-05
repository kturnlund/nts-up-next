import NTSProvider from './api/NTSContext';
import NowPlayingCardArea from './components/NowPlayingCard/NowPlayingCardArea';
import SunburstArea from './components/Sunburst/SunburstArea';
import useGetNTSGenres from './hooks/useGetNTSGenres';
import './index.css';

function App() {
  useGetNTSGenres();
  return (
    <NTSProvider>
      <div className='ntsLayout'>
      <SunburstArea />
      <NowPlayingCardArea />
      </div>
    </NTSProvider>
  )
}

export default App
