import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';
import { COORDINATE, MAP_CLIENT_ID } from '../../const/support';

function NaverMapAPI() {
  const navermaps = window.naver.maps;
  const storeMapStyle = {
    width: '100%',
    height: '90vh',
    background: '#ddd',
    display: 'block',
  };
  return (
    <NaverMap
      mapDivId={'maps-getting-started-uncontrolled'}
      style={storeMapStyle}
      defaultCenter={ COORDINATE }
      defaultZoom={13}
      zoom={13}
      scaleControl={false}
      logoControl={false}
      zoomControl={true}
      mapTypeControl={true}
      mapTypeControlOptions={{
        style: window.naver.maps.MapTypeControlStyle.BUTTON,
        position: window.naver.maps.Position.TOP_RIGHT,
      }}
    >
      <Marker 
        mapDivId={'maps-getting-started-uncontrolled'}
        key={1}
        position={new navermaps.LatLng(COORDINATE)}
        icon={{
          url: '../../images/support/naver_map_marker.svg',
          size: new navermaps.Size(50, 67)
        }}
      />
    </NaverMap>
  );
}

export default function LoadedNaverMap() {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={ MAP_CLIENT_ID }
    >
      <NaverMapAPI />
    </RenderAfterNavermapsLoaded>
  )
}