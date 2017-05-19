import React, {Component} from "react";
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import CONSTANTS from "../../Constants";
import SCREEN_HELPER from "../../utils/ScreenHelper";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class HomeList extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: CONSTANTS.appName,
        headerTitleStyle: {
            color: CONSTANTS.theme.navBar_tintColor,
        },
        headerStyle: {
            backgroundColor: CONSTANTS.theme.navBar_backgroundColor,
        },
        headerRight: <View style={{marginRight: 15}}>
            <TouchableHighlight onPress={() => navigation.navigate(SCREEN_HELPER.CAMERA_AND_CAMERA_ROLL)}>
                <FontAwesome name="plus" size={20} color={CONSTANTS.theme.navBar_tintColor}/>
            </TouchableHighlight>
        </View>,
        tabBarLabel: 'List',
        tabBarIcon: ({tintColor}) => (
            <FontAwesome name="list" size={20} color={tintColor}/>
        ),
    });

// Initialize the hardcoded data
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    key: 'a',
                    title: 'a title',
                    description: 'Death Note, di Indonesia juga dikenal dengan judul Dunia Dewa Kematian, adalah judul sebuah serial manga Jepang yang ditulis oleh Tsugumi Ohba dan ilustrasi oleh Takeshi Obata. Manga ini menceritakan tentang Light Yagami, seorang siswa genius yang secara kebetulan menemukan Death Note milik shinigami (dewa kematian). Direalisasikan di majalah Shonen Jump dari Januari 2004 hingga Mei 2006 dengan total 108 bab. Versi tankoubonnya terbit sebanyak 12 jilid dan 1 jilid spesial yang berjudul How to Read 13 yang berisi tentang penjelasan dan profil tentang Death Note. Di Indonesia anime ini ditayangkan oleh SCTV dan Global TV.',
                    profilePictureUrl: 'http://assets0.prcdn.com/uk/people/default-profile.png?1406639312',
                    imageUrl: 'http://cdn01.androidauthority.net/wp-content/uploads/2015/11/00-best-backgrounds-and-wallpaper-apps-for-android.jpg'
                },
                {
                    key: 'b',
                    title: 'b title',
                    description: 'Death Note, di Indonesia juga dikenal dengan judul Dunia Dewa Kematian, adalah judul sebuah serial manga Jepang yang ditulis oleh Tsugumi Ohba dan ilustrasi oleh Takeshi Obata. Manga ini menceritakan tentang Light Yagami, seorang siswa genius yang secara kebetulan menemukan Death Note milik shinigami (dewa kematian). Direalisasikan di majalah Shonen Jump dari Januari 2004 hingga Mei 2006 dengan total 108 bab. Versi tankoubonnya terbit sebanyak 12 jilid dan 1 jilid spesial yang berjudul How to Read 13 yang berisi tentang penjelasan dan profil tentang Death Note. Di Indonesia anime ini ditayangkan oleh SCTV dan Global TV.',
                    profilePictureUrl: 'http://www.anz.com/resources/5/1/51effbe1-70cb-4203-b8f2-c1555c306d46/4/profile.png?MOD=AJPERES&CACHEID=51effbe1-70cb-4203-b8f2-c1555c306d46/4',
                    imageUrl: 'https://s-media-cache-ak0.pinimg.com/736x/80/91/f9/8091f9dceb2ea55fa7b57bb7295e1824.jpg'
                }
            ]
        };
    }

    _renderItem = ({item}) => {
        return (
            <ListItem item={item}/>
        );
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

class ListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const id = this.props.item.id;
        const title = this.props.item.title;
        const description = this.props.item.description;
        const imageUrl = this.props.item.imageUrl;
        const profilePictureUrl = this.props.item.profilePictureUrl;

        return (
            <View style={{flex: 1}}>
                {/* Bar Header */}
                <View style={[
                    styles.layout,
                    {
                        flexDirection: 'row',
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }
                ]}>

                    <View style={{flexDirection: 'row', flex: 1}}>
                        <Image style={styles.profilePicture}
                               source={{uri: profilePictureUrl}}/>
                        <Text style={styles.title}>{title}</Text>
                    </View>

                    {/*<Image style={{width: 40, height: 40, borderRadius: 20, marginRight: 20}}*/}
                    {/*source={{uri: 'http://placehold.it/100x100'}}/>*/}
                </View>

                {/* Image */}

                <Image style={styles.image} source={{uri: imageUrl}}/>

                {/* Bar Actions */}

                <View
                    style={[styles.layout, {flexDirection: 'row', height: 60, alignItems: 'center'}]}>
                    <FontAwesome name="heart-o" size={25}/>
                    <View style={styles.space}/>
                    <FontAwesome name="comment-o" size={25}/>
                    <View style={styles.space}/>
                    <FontAwesome name="share" size={25}/>
                </View>

                {/* Bar Description */}

                <View style={[styles.layout, {paddingBottom: 20}]}>
                    <Text numberOfLines={4} style={styles.description}>
                        {description}
                    </Text>
                    <Text style={{paddingTop: 5}}>15 May 2017</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontSize: 24,
        color: 'black',
    },
    image: {
        height: Dimensions.get('window').width,
    },
    actionIcon: {
        width: 35,
        height: 35,
    },
    description: {
        color: 'black',
    },
    space: {
        width: 15,
    },
    layout: {
        paddingLeft: 15,
        paddingRight: 15,
    }
});