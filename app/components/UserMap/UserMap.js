import React, { Component } from 'react';


Expo.Font.loadAsync({
    'Rubik-Regular': require('../../../node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
    'Rubik-MediumItalic': require('../../../node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
    'Rubik-Medium': require('../../../node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
    'Rubik-LightItalic': require('../../../node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
    'Rubik-Light': require('../../../node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
    'Rubik-BoldItalic': require('../../../node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
  });

import { Screen, Spinner, Examples } from '@shoutem/ui';
import { stringify as queryString } from 'query-string';

import styles from './styles';
import RecommendationsMap from './RecommendationsMap';
import { OverlayTopics, BottomTopics } from './Topics';

const OPENTABLE_URL = 'https://platform.otqa.com/sync/directory';
class App extends Component {
    state = {
        mapRegion: null,
        gpsAccuracy: null,
        recommendations: [],
        lookingFor: null,
        headerLocation: null,
        last4sqCall: null
    }
    watchID = null

    componentWillMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922*1.5,
                longitudeDelta: 0.00421*1.5
            }

            this.onRegionChange(region, position.coords.accuracy);
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    onRegionChange(region, gpsAccuracy) {
        this.fetchVenues(region);

        this.setState({
            mapRegion: region,
            gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
        });
    }

    fetchVenues(region, lookingFor) {
        if (!this.shouldFetchVenues(lookingFor)) return;

        const query = this.venuesQuery(region, lookingFor);
        
        fetch(`${FOURSQUARE_ENDPOINT}?${query}`)
            .then(fetch.throwErrors)
            .then(res => res.json())
            .then(json => {
                if (json.response.groups) {
                    this.setState({
                        recommendations: json.response.groups.reduce(
                            (all, g) => all.concat(g ? g.items : []), []
                        ),
                        headerLocation: json.response.headerLocation,
                        last4sqCall: new Date()
                    });
                }
            })
            .catch(err => console.log(err));
    }

    shouldFetchVenues(lookingFor) {
        return lookingFor != this.state.lookingFor
             || this.state.last4sqCall === null
             || new Date() - this.state.last4sqCall > API_DEBOUNCE_TIME;
    }

    venuesQuery({ latitude, longitude }, lookingFor) {
        return queryString({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            v: 20170305,
            ll: `${latitude}, ${longitude}`,
            llAcc: this.state.gpsAccuracy,
            section: lookingFor || this.state.lookingFor || 'food',
            limit: 10,
            openNow: 1,
            venuePhotos: 1
        });
    }

    onTopicSelect(lookingFor) {
        this.fetchVenues(this.state.mapRegion, lookingFor);

        this.setState({
            lookingFor: lookingFor
        });
    }

    render() {
        const { mapRegion, lookingFor } = this.state;

        if (mapRegion) {
            return (
                <Screen>
                    <RecommendationsMap {...this.state} onRegionChange={this.onRegionChange.bind(this)} />

                    {!lookingFor ? <OverlayTopics onTopicSelect={this.onTopicSelect.bind(this)} />
                                 : <BottomTopics onTopicSelect={this.onTopicSelect.bind(this)} />}
                </Screen>
            );
        }else{
            return (
                <Screen style={styles.centered}>
                    <Spinner styleName="large" />
                </Screen>
            );
        }
    }
}



export default App;