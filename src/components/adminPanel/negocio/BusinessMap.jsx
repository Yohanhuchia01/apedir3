// src/components/adminPanel/negocio/BusinessMap.jsx
import { MapContainer, TileLayer } from 'react-leaflet';
import DraggableMarker from './DraggableMarker';

const BusinessMap = ({ initialPosition, onPositionChange }) => {
    return (
        <MapContainer
            style={{ height: "200px", width: "100%", border: '2px solid black' }}
            center={initialPosition}
            zoom={15}
            attributionControl={false}
        >
            <TileLayer
                url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
            />
            <DraggableMarker initialPosition={initialPosition} onDragEnd={onPositionChange} />
        </MapContainer>
    );
};

export default BusinessMap;