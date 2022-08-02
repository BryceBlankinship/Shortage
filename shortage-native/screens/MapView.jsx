import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { default as GoogleMap, PROVIDER_GOOGLE } from 'react-native-maps';
import { MAPS_API_KEY } from '@env';

const styles = StyleSheet.create({
    mapContainer: {
        marginTop: 70,
    },

    header: {
        marginLeft: 20,
        fontSize: 30,
        fontWeight: '700',
    },
    
    map: {
        marginTop: 10,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 170,
    }
});

export default function MapView() {
    const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });
    const [zoom, setZoom] = useState(4);

    useEffect(() => {
        setCenter({ lat: -34.397, lng: 150.644 });
        setZoom(4);
    }, []);


    return (
        <View style={styles.mapContainer}>
            <Text style={styles.header}>Map</Text>

            <GoogleMap style={styles.map} apiKey={MAPS_API_KEY} provider={PROVIDER_GOOGLE} region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }} />
        </View>
    )
}