import { useEffect, useState } from "react";

function useLocation() {
    const [location, setLocation] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setError(null);
                    console.log(latitude)
                    console.log(longitude)
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    });

    useEffect(() => {
        if (latitude && longitude) {
            ; (async () => {
                const AccessToken = "pk.eb05440ea9853a458bc1a060fcb4e122";
                const FetchApi = await fetch(`https://us1.locationiq.com/v1/reverse?key=${AccessToken}&lat=${latitude}&lon=${longitude}&format=json&`);
                console.log(FetchApi)
                if (FetchApi.ok) {
                    const response = await FetchApi.json();
                    console.log(response);
                    setLocation(response);
                }
                else {
                    setError("404 api bad response")
                }
            })();
        }
    }, [latitude, longitude]);


    return { location, error };
}

export default useLocation;