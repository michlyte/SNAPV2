import React, {Component} from "react";
import {FlatList, Image, Text, TouchableHighlight, View} from "react-native";
import THEME from "../../util/Theme";
import CONFIG from "../../util/Config";
import SCREEN from "../../util/Screen";

import Icon from "react-native-vector-icons/FontAwesome";

export default class HomeList extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: CONFIG.appName,
        headerTitleStyle: {
            color: THEME.navBar_tintColor,
        },
        headerStyle: {
            backgroundColor: THEME.navBar_backgroundColor,
        },
        headerRight: <View style={{marginRight: 15}}>
            <TouchableHighlight onPress={() => navigation.navigate(SCREEN.CAMERA_AND_CAMERA_ROLL)}>
                <Icon name="plus" size={20} color={THEME.navBar_tintColor}/>
            </TouchableHighlight>
        </View>,
        tabBarLabel: 'List',
    });

// Initialize the hardcoded data
    constructor(props) {
        super(props);
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
                    data={[
                        {key: 'a', title: 'a title'},
                        {key: 'b', title: 'b title'}
                    ]}
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
        return (
            <View style={{flex: 1}}>
                {/* Bar Header */}
                <View style={{
                    flexDirection: 'row',
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: 15
                }}>

                    <View style={{flexDirection: 'row', flex: 1}}>
                        <Image style={{width: 40, height: 40, borderRadius: 20}}
                               source={{uri: 'http://placehold.it/100x100'}}/>
                        <Text style={{flex: 1, marginLeft: 10, fontSize: 24}}>{this.props.item.title}</Text>
                    </View>

                    {/*<Image style={{width: 40, height: 40, borderRadius: 20, marginRight: 20}}*/}
                    {/*source={{uri: 'http://placehold.it/100x100'}}/>*/}
                </View>

                {/* Image */}

                <Image style={{height: 280}} source={{uri: 'https://www.snapchat.com/global/social-lg.jpg'}}/>

                {/* Bar Actions */}

                <View style={{flexDirection: 'row', height: 60, alignItems: 'center', paddingLeft: 15}}>
                    <Image style={{width: 40, height: 40, borderRadius: 20}}
                           source={{uri: 'http://placehold.it/100x100'}}/>
                    <Image style={{width: 40, height: 40, borderRadius: 20, marginLeft: 15}}
                           source={{uri: 'http://placehold.it/100x100'}}/>
                    <Image style={{width: 40, height: 40, borderRadius: 20, marginLeft: 15}}
                           source={{uri: 'http://placehold.it/100x100'}}/>
                </View>

                {/* Bar Description */}

                <View style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 20}}>
                    <Text numberOfLines={4}>
                        Death Note, di Indonesia juga dikenal dengan judul Dunia Dewa Kematian, adalah judul sebuah
                        serial manga Jepang yang ditulis oleh Tsugumi Ohba dan ilustrasi oleh Takeshi Obata. Manga ini
                        menceritakan tentang Light Yagami, seorang siswa genius yang secara kebetulan menemukan Death
                        Note milik shinigami (dewa kematian). Direalisasikan di majalah Shonen Jump dari Januari 2004
                        hingga Mei 2006 dengan total 108 bab. Versi tankoubonnya terbit sebanyak 12 jilid dan 1 jilid
                        spesial yang berjudul How to Read 13 yang berisi tentang penjelasan dan profil tentang Death
                        Note. Di Indonesia anime ini ditayangkan oleh SCTV dan Global TV.
                    </Text>
                    <Text>15 May 2017</Text>
                </View>
            </View>
        );
    }
}
