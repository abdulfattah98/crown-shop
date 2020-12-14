import React from 'react';
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    InfoWindow,
    Marker,
} from 'react-google-maps';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';

const {
    MarkerWithLabel,
} = require('react-google-maps/lib/components/addons/MarkerWithLabel');

Geocode.setApiKey('AIzaSyAQNvqdWwnrqSkXiCyUNryFx7vvpqSj3k4');
Geocode.enableDebug();

class LocationSearchModal extends React.Component {
    state = {
        address: '',
        city: '',
        area: '',
        state: '',
        zoom: 15,
        height: 200,
        mapPosition: {
            lat: 0,
            lng: 0,
        },
        markerPosition: {
            lat: 0,
            lng: 0,
        },
        Building: '',
        pincode: '',
    };

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState(
                    {
                        mapPosition: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                        markerPosition: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                    },
                    () => {
                        Geocode.fromLatLng(
                            position.coords.latitude,
                            position.coords.longitude
                        ).then(
                            (response) => {
                                console.log(response);
                                const address =
                                        response.results[0].formatted_address,
                                    addressArray =
                                        response.results[0].address_components,
                                    city = this.getCity(addressArray),
                                    area = this.getArea(addressArray),
                                    state = this.getState(addressArray);
                                console.log('city', city, area, state);
                                this.setState({
                                    address: address ? address : '',
                                    area: area ? area : '',
                                    city: city ? city : '',
                                    state: state ? state : '',
                                });
                            },
                            (error) => {
                                console.error(error);
                            }
                        );
                    }
                );
            });
        } else {
            console.error('Geolocation is not supported by this browser!');
        }
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (
    //         this.state.markerPosition.lat !== this.state.center.lat ||
    //         this.state.address !== nextState.address ||
    //         this.state.city !== nextState.city ||
    //         this.state.area !== nextState.area ||
    //         this.state.state !== nextState.state
    //     ) {
    //         return true
    //     } else if (this.state.mapPosition.lat === nextState.mapPosition.lat) {
    //         return false
    //     }
    // }

    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (
                addressArray[i].types[0] &&
                'administrative_area_level_2' === addressArray[i].types[0]
            ) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };

    getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if (
                        'sublocality_level_1' === addressArray[i].types[j] ||
                        'locality' === addressArray[i].types[j]
                    ) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };

    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (
                    addressArray[i].types[0] &&
                    'administrative_area_level_1' === addressArray[i].types[0]
                ) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        console.log('Changed ');
    };

    onInfoWindowClose = (event) => {};

    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            (response) => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);
                this.setState({
                    address: address ? address : '',
                    area: area ? area : '',
                    city: city ? city : '',
                    state: state ? state : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng,
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng,
                    },
                });
            },
            (error) => {
                console.error(error);
            }
        );
    };

    onPlaceSelected = (place) => {
        console.log('place Selected');
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();

        console.log('latvalue', latValue);
        console.log('lngValue', lngValue);

        // Set these values in the state.
        this.setState({
            address: address ? address : '',
            area: area ? area : '',
            city: city ? city : '',
            state: state ? state : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue,
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue,
            },
        });
    };

    // const AsyncMap = compose(
    //     withProps({
    //         googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyALVjLwOIM1gf7EzdJJVmWLKdLP-yZGTcw&v=3.exp&libraries=geometry,drawing,places",
    //         loadingElement: <div style={{ height: `100%` }} />,
    //         containerElement: <div style={{ height: `400px` }} />,
    //         mapElement: <div style={{ height: `100%` }} />,
    //     }),
    //     withScriptjs,
    //     withGoogleMap
    // )((props) =>
    //     <GoogleMap

    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap((props) => (
                <GoogleMap
                    defaultZoom={this.state.zoom}
                    defaultCenter={{
                        lat: this.state.mapPosition.lat,
                        lng: this.state.mapPosition.lng,
                    }}
                >
                    {/* InfoWindow on top of marker */}

                    {/*Marker*/}
                    <Marker
                        google={this.props.google}
                        name={'Dolores park'}
                        draggable={true}
                        onDragEnd={this.onMarkerDragEnd}
                        position={{
                            lat: this.state.markerPosition.lat,
                            lng: this.state.markerPosition.lng,
                        }}
                    />
                    <InfoWindow
                        onClose={this.onInfoWindowClose}
                        position={{
                            lat: this.state.markerPosition.lat + 0.0018,
                            lng: this.state.markerPosition.lng,
                        }}
                    >
                        <div>
                            <span style={{ padding: 0, margin: 0 }}>
                                {this.state.address}
                            </span>
                        </div>
                    </InfoWindow>
                    <Marker />

                    {/* <MarkerWithLabel
                            position={{ lat: -34.397, lng: 150.644 }}
                            labelAnchor={new google.maps.Point(0, 0)}
                            labelStyle={{ backgroundColor: "yellow", fontSize: "32px", padding: "16px" }}
                        >
                            <div>Hello There!</div>
                        </MarkerWithLabel> */}

                    {/* For Auto complete Search Box */}
                    <Autocomplete
                        style={{
                            width: '100%',
                            height: '40px',
                            paddingLeft: '16px',
                            marginTop: '2px',
                            marginBottom: '2rem',
                        }}
                        onPlaceSelected={this.onPlaceSelected}
                        types={['(regions)']}
                    />
                </GoogleMap>
            ))
        );

        return (
            <div>
                <AsyncMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQNvqdWwnrqSkXiCyUNryFx7vvpqSj3k4&libraries=places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={
                        <div style={{ height: this.state.height }} />
                    }
                    mapElement={<div style={{ height: `100%` }} />}
                />
                <div className="row mt-5 p-2">
                    <div className="form-group col-12">
                        <label htmlFor="">Address</label>
                        <input
                            type="text"
                            name="address"
                            className="form-control"
                            onChange={this.onChange}
                            readOnly="readOnly"
                            value={this.state.address}
                        />
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label htmlFor="">City</label>
                        <input
                            type="text"
                            name="city"
                            className="form-control"
                            onChange={this.onChange}
                            readOnly="readOnly"
                            value={this.state.city}
                        />
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label htmlFor="">Area</label>
                        <input
                            type="text"
                            name="area"
                            className="form-control"
                            onChange={this.onChange}
                            readOnly="readOnly"
                            value={this.state.area}
                        />
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label htmlFor="">State</label>
                        <input
                            type="text"
                            name="state"
                            className="form-control"
                            onChange={this.onChange}
                            readOnly="readOnly"
                            value={this.state.state}
                        />
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label htmlFor="">Building</label>
                        <input
                            type="text"
                            name="Building"
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.Building}
                        />
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label htmlFor="">pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            className="form-control"
                            onChange={this.onChange}
                            value={this.state.pincode}
                        />
                    </div>
                    <div className="form-group d-none">
                        {/* <input
                            type="text"
                            name="city"
                            className="form-control"
                            onChange={this.props.getData(this.state)}
                            readOnly="readOnly"
                            value={this.state.mapPosition.lng}
                        /> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default LocationSearchModal;
