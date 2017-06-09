/**
 * Created by michael on 6/7/2017.
 */
import React, {Component} from "react";
import {Dimensions, ScrollView, StyleSheet, View, Alert} from "react-native";
import MapView from "react-native-maps";
import Geocoder from "react-native-geocoder";
import t from "tcomb-form-native";
import _ from "lodash";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import SNAPButton from "../../components/SNAPButton";

import CONSTANTS from "../../Constants";
import STRING_HELPER from "../../utils/StringHelper";

const Form = t.form.Form;
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

export default class LocationDetail extends Component {
    constructor(props) {
        super(props);

        Geocoder.fallbackToGoogle(CONSTANTS.GOOGLE_API_KEY);

        this.marker = null;
        this.googlePlacesAutocomplete = null;
        this.maps = null;

        this.data = t.struct({
            title: t.String,
            description: t.String,
        });

        this.state = {
            location: '',
            title: '',
            description: '',

            marker: {
                latitude: 37.76409597022716,
                longitude: -122.43240404874085,
            }
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this._onGeocodingLatLong(position.coords.latitude, position.coords.longitude);
        });
    }

    _onLongPress = (event) => {
        this._onGeocodingLatLong(event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude);
    };

    _onGeocodingLatLong = (lat, lng) => {
        const position = {
            lat: lat,
            lng: lng,
        };

        Geocoder.geocodePosition(position).then(res => {
            if (res.length > 0) {
                const data = res[0];
                // console.log("lat: " + lat);
                // console.log("lng: " + lng);
                // console.log("location: " + data.formattedAddress);

                this._setAddressText(data.formattedAddress);
                this._setMapPosition(lat, lng);
                this._setMarkerPosition(lat, lng, data.formattedAddress);
            }
        }).catch(err => console.log(err))
    };

    _attemptSubmit = () => {
        // const location = this.state.location;
        //
        // if (location && location.length > 0) {
        //     const value = this.refs.form.getValue();
        //     if (value) {
        //         console.log(value);
        //     }
        // } else {
            Alert.alert(
                STRING_HELPER.TITLE_WARNING,
                'Location is required',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        // }
    };

    _onPressGooglePlacesAutocomplete = (lat, lng, formattedAddress) => {
        this._setMapPosition(lat, lng);
        this._setMarkerPosition(lat, lng, formattedAddress);
    };

    _setMapPosition = (lat, lng) => {
        let tempCoords = {
            latitude: lat,
            longitude: lng,
        };
        this.maps.animateToCoordinate(tempCoords, 1);
    };

    _setAddressText = (formattedAddress) => {
        if (this.googlePlacesAutocomplete) {
            this.googlePlacesAutocomplete.setAddressText(formattedAddress);
        }
    };

    _setMarkerPosition = (lat, lng, formattedAddress) => {
        if (this.marker) {
            this.marker.hideCallout();
        }

        let newMarker = {
            latitude: lat,
            longitude: lng,
        };
        this.setState({
            location: formattedAddress,
            marker: newMarker,
        });

        setTimeout(() => {
            if (this.marker) {
                this.marker.showCallout();
            }
        }, 500);
    };

    render() {
        return (
            <ScrollView
                style={styles.scrollView}
            >
                <View style={{flex: 1}}>
                    <GooglePlacesAutocomplete
                        ref={googlePlacesAutocomplete => {
                            (this.googlePlacesAutocomplete = googlePlacesAutocomplete)
                        }}
                        placeholder='Search'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={(row) => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            this._onPressGooglePlacesAutocomplete(details.geometry.location.lat, details.geometry.location.lng, details.formatted_address);
                        }}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: CONSTANTS.GOOGLE_API_KEY,
                            language: 'en', // language of the results
                            types: 'geocode', // default: 'geocode'
                        }}
                        styles={{
                            description: {
                                fontWeight: 'bold',
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                        }}
                        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    />
                    <MapView
                        ref={component => this.maps = component}
                        style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width}}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onLongPress={this._onLongPress}
                    >
                        <MapView.Marker
                            coordinate={this.state.marker}
                            title={"Your Location"}
                            description={this.state.location}
                            ref={marker => (this.marker = marker)}
                        />
                    </MapView>
                    <View style={styles.space}/>
                    <View style={{paddingLeft: 15, paddingRight: 15}}>
                        <Form
                            ref="form"
                            type={this.data}
                            options={{
                                auto: 'placeholders',
                                fields: {
                                    title: {
                                        stylesheet: stylesheet,
                                        value: this.state.title,
                                    },
                                    description: {
                                        stylesheet: stylesheet,
                                        value: this.state.description,
                                    },
                                }
                            }}
                        />
                    </View>
                    <View style={[styles.layout, {marginTop: 5, alignItems: 'flex-end'}]}>
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
        fontSize: 17,
        height: 36,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 7,
    },
});