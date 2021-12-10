import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { getCenter } from 'geolib';

function Map({searchResult}) {
  
    const [selectedLocation, setSelectedLocation] = useState({});
    
    const coordinates = searchResult.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: '100%',height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    })
    return (
        <ReactMapGL
        mapStyle='mapbox://styles/avik18/ckx0ht1ex203b15qaowiewzr8'
        mapboxApiAccessToken='pk.eyJ1IjoiYXZpazE4IiwiYSI6ImNreDBobjVibTAyYW4yb3J6ZTVveXpjYTUifQ.9nlK4go44jXbVLjfEDLawA'
        {...viewport}
        onViewportChange={(nextViewport)=> setViewport(nextViewport)}
        >

        {searchResult.map(result => (
            <div key={result.long}>
                <Marker
                longitude={result.long}
                latitude={result.lat}
                offsetLeft={-20}
                offsetTop={-10}
                >
                <p 
                role="img"
                onClick={() => setSelectedLocation(result)}
                className="cursor-pointer text-2xl animate-bounce"
                aria-label="push-pin">
            
                📌</p>
                </Marker>
                {selectedLocation.long === result.long ?(
                    <Popup
                    onClose={()=> setSelectedLocation({})} 
                    closeOnClick={true}
                    latitude={result.lat}
                    longitude={result.long}>
                        {result.title}
                    </Popup>
                ):(false)}
            </div>
        ))}

        </ReactMapGL>
    )
}

export default Map
