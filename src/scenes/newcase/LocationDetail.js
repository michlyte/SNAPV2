/**
 * Created by michael on 6/7/2017.
 */
import React, {Component} from "react";
import {StyleSheet, Dimensions, View, TextInput} from "react-native";
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';

import CONSTANTS from "../../Constants";

export default class LocationDetail extends Component {
    constructor(props) {
        super(props);

        Geocoder.fallbackToGoogle(CONSTANTS.GOOGLE_API_KEY);

        this.state = {
            location: '',
            title: '',
            description: '',

            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            marker: {
                latitude: 37.76409597022716,
                longitude: -122.43240404874085,
            }
        }
    }

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };

            this.setState({
                region: region,
            });
        });

        this._onGeocodingLatLong(this.state.marker.latitude, this.state.marker.longitude);
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    _onLongPress = (event) => {
        // Move marker
        this.setState({
            marker: event.nativeEvent.coordinate,
        });

        this._onGeocodingLatLong(this.state.marker.latitude, this.state.marker.longitude);
    };

    _onGeocodingLatLong = (lat, lng) => {
        const position = {
            lat: lat,
            lng: lng,
        };

        Geocoder.geocodePosition(position).then(res => {
            if (res.length > 0) {
                const data = res[0];
                this.setState({
                    location: data.formattedAddress,
                })
            }
        }).catch(err => console.log(err))
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <TextInput
                    style={[styles.layout, {height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10}]}
                    onChangeText={(location) => this.setState({location: location})}
                    value={this.state.location}
                />
                <View style={styles.space}/>
                <MapView
                    style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width}}
                    initialRegion={this.state.region}
                    onLongPress={this._onLongPress}
                >
                    <MapView.Marker
                        coordinate={this.state.marker}
                        title={"Michael Halim"}
                        description={"Description"}
                    />
                </MapView>
                <View style={styles.space}/>
                <TextInput
                    style={[styles.layout, {height: 40, borderColor: 'gray', borderWidth: 1}]}
                    onChangeText={(title) => this.setState({title: title})}
                    value={this.state.title}
                />
                <View style={styles.space}/>
                <TextInput
                    style={[styles.layout, {height: 40, borderColor: 'gray', borderWidth: 1}]}
                    onChangeText={(description) => this.setState({description: description})}
                    value={this.state.description}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    layout: {
        marginLeft: 10,
        marginRight: 10,
    },
    space: {
        width: 10,
        height: 10,
    }
});