/**
 * Created by michael on 6/7/2017.
 */
import React, {Component} from "react";
import {StyleSheet, Dimensions, View, TextInput, TouchableOpacity, ScrollView} from "react-native";
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import RNGooglePlaces from 'react-native-google-places';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import FontAwesome from "react-native-vector-icons/FontAwesome";
import SNAPButton from "../../components/SNAPButton";

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

    _openSearchModal = () => {
        RNGooglePlaces.openAutocompleteModal({
            latitude: this.state.marker.latitude,
            longitude: this.state.marker.longitude,
        })
            .then((place) => {
                console.log(place);
                // place represents user's selection from the
                // suggestions and it is a simplified Google Place object.
                this.setState({
                    location: place.address,
                });
            })
            .catch(error => console.log(error.message));  // error is a Javascript Error object
    };

    _openPickerModal = () => {
        RNGooglePlaces.openPlacePickerModal({
            latitude: 53.544389,
            longitude: -113.490927,
            radius: 0.01 // 10 meters
        })
            .then((place) => {
                console.log(place);
            })
            .catch(error => console.log(error.message));
    };

    _onFocus = () => {
        console.log("_onFocus");
    };

    _attemptSubmit = () => {

    };

    render() {
        return (
            <ScrollView
                style={styles.scrollView}
            >
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TextInput
                            style={[styles.layout, styles.textInput, {flex: 1, marginTop: 10}]}
                            placeholder={"Enter Location... "}
                            onFocus={this._onFocus}
                            onChangeText={(location) => this.setState({location: location})}
                            value={this.state.location}
                        />
                        <TouchableOpacity
                            style={{marginRight: 10}}
                            onPress={this._openSearchModal}
                        >
                            <FontAwesome name="search" size={26} color={'black'}/>
                        </TouchableOpacity>
                    </View>
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
                        style={[styles.layout, styles.textInput]}
                        onChangeText={(title) => this.setState({title: title})}
                        value={this.state.title}
                    />
                    <View style={styles.space}/>
                    <TextInput
                        style={[styles.layout, styles.textInput]}
                        onChangeText={(description) => this.setState({description: description})}
                        value={this.state.description}
                    />
                    <View style={[styles.layout, {marginTop: 10, alignItems: 'flex-end'}]}>
                        <SNAPButton
                            onPress={this._attemptSubmit}
                            text={"Submit"}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
    },
    layout: {
        marginLeft: 10,
        marginRight: 10,
    },
    space: {
        width: 10,
        height: 10,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    },
});