import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isUserAuthenticated } from "../guards/auth-guard";

const useSearchNearbyPlaces = (radius = 500, ...type) => {
  const [location, setLocation] = useState({});
  const [placeResults, setPlaceResults] = useState([]);

  const pharmacies = useSelector((state) => state?.pharmacies);
  const isAuthenticated = isUserAuthenticated();

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error(error);
          // Handle location fetching errors
        }
      );
    }
  }, []);

  useEffect(() => {
    const getNearbyPlaces = (location) => {
      // Create a new PlacesService object
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      // Define the request parameters
      const request = {
        location: location,
        radius: radius,
        types: [...type],
      };
      console.log(request);

      // Send the request to the PlacesService
      service.nearbySearch(request, callback);
    };

    // Define the callback function to handle the response
    const callback = (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        // Process the results
        setPlaceResults(results);
      }
    };

    // Create a LatLng object with the provided latitude and longitude
    const latLngObj = new window.google.maps.LatLng(
      location.latitude,
      location.longitude
    );

    // Call the getNearbyPlaces function with the location
    if (!pharmacies?.length && isAuthenticated) getNearbyPlaces(latLngObj);
  }, [location]);
  return { places: placeResults };
};

export default useSearchNearbyPlaces;
