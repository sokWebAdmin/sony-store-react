import React, { useEffect, useMemo } from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';
import { COORDINATE, MAP_CLIENT_ID } from '../../const/support';
import { useWindowSize } from '../../utils/utils';

function NaverMapAPI() {
  const navermaps = window.naver.maps;

  const size = useWindowSize();
  const isMobile = size.width <= 640;

  const storeMapStyle = useMemo(
    () => ({
      width: '100%',
      height: isMobile ? '400px' : '560px',
      background: '#ddd',
      display: 'block',
      marginTop: isMobile ? '48px' : '40px',
    }),
    [isMobile],
  );

  useEffect(() => {
    new navermaps.Size(size.width, isMobile ? 400 : 560);
    //   navermaps.Map.setSize(_size);
  }, [isMobile]);

  return (
    <NaverMap
      mapDivId={'maps-getting-started-uncontrolled'}
      style={storeMapStyle}
      defaultCenter={COORDINATE}
      defaultZoom={13}
      zoom={13}
      zoomControl={true}
      scaleControl={false}
      logoControl={false}
      mapDataControl={false}
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
          size: new navermaps.Size(50, 67),
        }}
      />
    </NaverMap>
  );
}

export default function LoadedNaverMap() {
  return (
    <RenderAfterNavermapsLoaded ncpClientId={MAP_CLIENT_ID}>
      <NaverMapAPI />
    </RenderAfterNavermapsLoaded>
  );
}
