import { Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { selectCurrentMarker } from './redux/markerSlice';
import InputPlacesAutocomplete from './components/InputPlacesAutocomplete';
import MapComponent from './components/MapComponent'
import './App.css';

function App() {
  const marker = useSelector(selectCurrentMarker);

  const center = marker ? marker : { lat: 41.3873974, lng: 2.168568 }

  return (
    <>
      <div className='searchBar'>
        <InputPlacesAutocomplete />
      </div>
      <MapComponent center={center} >
        {marker && <Marker position={marker} />}
      </MapComponent>
    </>
  );
}

export default App;
