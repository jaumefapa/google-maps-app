import { useDispatch } from 'react-redux';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { addMarker } from '../redux/markerSlice';
import BoldText from "./BoldText";
import './InputPlacesAutocompleteStyle.css'

const InputPlacesAutocomplete = () => {
  const dispatch = useDispatch()
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 500,
    cache: 3600,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          dispatch(addMarker({ lat, lng }))
          setValue('');
        })
        .catch((error) => {
          console.error(error);
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div key={place_id} onClick={handleSelect(suggestion)} className="inputResult">
          <BoldText
            text={`${main_text}, ${secondary_text}`}
            match={value}
          />
        </div>
      );
    });

  return (
    <div>
      <input
        className="inputField"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
      />
      {status === "OK" && <div>{renderSuggestions()}</div>}
    </div>
  );
};

  export default InputPlacesAutocomplete;