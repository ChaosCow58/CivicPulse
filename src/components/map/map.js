'use client'

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import 'leaflet-control-geocoder';

export default function Map() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const polygonRef = useRef(null);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [tilesLoaded, setTilesLoaded] = useState(0);
  const [tilesFailed, setTilesFailed] = useState(0);

  useEffect(() => {
    if (mapRef.current) return;

    try {
      Object.defineProperty(window, 'devicePixelRatio', {
        get: () => 1,
        configurable: true,
      });

      L.Browser.retina = false;

      mapRef.current = L.map(containerRef.current, {
        zoomAnimation: false,
      }).setView([49.2125578, 16.62662018], 14);

      const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        tileSize: 256,
        attribution: '&copy; OpenStreetMap',
        detectRetina: false,
      }).addTo(mapRef.current);

      var geocoder = L.Control.geocoder({
        defaultMarkGeocode: false
      })
        .on('markgeocode', function (e) {
          var osm_id = e.geocode.properties.osm_id;
          var osm_type = e.geocode.properties.osm_type; // 'relation', 'way', 'node'

          // Map osm_type to letter
          const typeMap = { relation: 'R', way: 'W', node: 'N' };
          var osmLetter = typeMap[osm_type];

          // Fetch the full polygon geometry
          fetch(`https://nominatim.openstreetmap.org/lookup?osm_ids=${osmLetter}${osm_id}&polygon_geojson=1&format=json`)
            .then(res => res.json())
            .then(data => {
              if (polygonRef.current) polygonRef.current.remove();

              var geojson = data[0].geojson;

              polygonRef.current = L.geoJSON(geojson, {
                style: {
                  color: '#3388ff',
                  weight: 2,
                  fillColor: '#3388ff',
                  fillOpacity: 0.1
                }
              }).addTo(mapRef.current);

              mapRef.current.fitBounds(polygonRef.current.getBounds());
            });
        })
        .addTo(mapRef.current);

      tileLayer.on('tileload', () => setTilesLoaded((n) => n + 1));
      tileLayer.on('tileload', (ev) => {
        // eslint-disable-next-line no-console
        console.debug('tile loaded', ev.tile && ev.tile.src);
      });
      tileLayer.on('tileerror', (ev) => {
        // eslint-disable-next-line no-console
        console.warn('tile error', ev.tile && ev.tile.src);
        setTilesFailed((n) => n + 1);
      });

      var popup = L.popup();

      function onMapClick(e) {
        const container = L.DomUtil.create('div');

        const buttonStyle = `
          padding: 6px 12px;
          margin-right: 8px;
          cursor: pointer;
          border: 1px solid #3388ff;
          border-radius: 4px;
          background: white;
          color: #3388ff;
          transition: background 0.2s, color 0.2s;
        `;

        const report = L.DomUtil.create('button', '', container);
        report.innerText = 'Make a Report';
        report.style.cssText = buttonStyle;
        report.addEventListener('mouseover', () => {
          report.style.background = '#3388ff';
          report.style.color = 'white';
        });
        report.addEventListener('mouseout', () => {
          report.style.background = 'white';
          report.style.color = '#3388ff';
        });

        const view = L.DomUtil.create('button', '', container);
        view.innerText = 'View Nearby Reports';
        view.style.cssText = buttonStyle;
        view.addEventListener('mouseover', () => {
          view.style.background = '#3388ff';
          view.style.color = 'white';
        });
        view.addEventListener('mouseout', () => {
          view.style.background = 'white';
          view.style.color = '#3388ff';
        });

        L.DomEvent.on(report, 'click', () => {
          alert("REPORT clicked!");
        });
        L.DomEvent.on(view, 'click', () => {
          alert("VIEW clicked!");
        });

        popup
          .setLatLng(e.latlng)
          .setContent(container)
          .openOn(mapRef.current);
      }

      /*function onMapClick(e) {
          popup
              .setLatLng(e.latlng)
              .setContent("TEST MESSAGE")
              .openOn(mapRef.current);
      }*/

      mapRef.current.on('click', onMapClick);

      

      setMounted(true);
    } catch (err) {
      // surface initialization errors to the page so they can be debugged in the browser
      // (also logs to devtools console)
      // eslint-disable-next-line no-console
      console.error('Leaflet map initialization error:', err);
      setError(err?.message || String(err));
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {error ? (
        <div style={{ padding: 16, color: 'white', background: 'crimson' }}>
          Map error: {error}
        </div>
      ) : null}
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
    </>
  );
}