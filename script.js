'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map;

const getGeoLocation = function (position) {
  const { latitude, longitude } = position.coords;

  const coords = [latitude, longitude];
  map = L.map('map').setView(coords, 14);

  L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  }).addTo(map);

  map.on('click', addMarkerToMap);
};

const addMarkerToMap = function (mapEvent) {
  const { lat, lng } = mapEvent.latlng;
  const coords = [lat, lng];

  const popupConfig = {
    maxWidth: 250,
    minWidth: 100,
    autoClose: false,
    closeOnClick: false,
    className: 'running-popup',
  };

  L.marker(coords)
    .addTo(map)
    .bindPopup(L.popup(popupConfig))
    .setPopupContent('Workout')
    .openPopup();
};

navigator.geolocation.getCurrentPosition(getGeoLocation, function () {
  alert('Unable to determine position');
});
