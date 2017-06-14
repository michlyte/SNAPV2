import React, {PureComponent} from "react";
import {FlatList, Text, View, TouchableOpacity} from "react-native";
import CONSTANTS, {MainTheme} from "../../Constants";
import CaseInListClass, {CaseAttachment, CaseLocation} from "../../models/CaseInListClass";
import {Env} from "../../utils/EnumHelper";
import ListLoadMoreView from "../../components/ListLoadMoreView";
import NotifInListItem from "../../components/CaseInListItem";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//Header
import NewCaseButton from "../../components/NewCaseButton";

export default class HomeList extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: <View
            style={{
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 35,
            }}
        >
            <TouchableOpacity onPress={() => {
            }}>
                <Text>Michael Halim</Text>
            </TouchableOpacity>
        </View>,
        headerTitleStyle: {
            justifyContent: 'space-between',
            textAlign: 'center',
            color: MainTheme.navBar_tintColor,
            backgroundColor: 'black',
        },
        headerStyle: {
            backgroundColor: MainTheme.navBar_backgroundColor,
        },
        headerRight: <NewCaseButton navigation={navigation}/>,
        tabBarLabel: 'List',
        tabBarIcon: ({tintColor}) => (
            <FontAwesome name="th-large" size={20} color={tintColor}/>
        ),
    });

    constructor(props) {
        super(props);

        this.state = {
            selected: (new Map(): Map<string, boolean>),
            data: [],
            page: 1,
            loading: false,
            refreshing: false,
        };
    }

    componentDidMount() {
        this._onRefresh();
    }

    _onChangeDataType = () => {
        console.log("_onChangeDataType");
    };

    _keyExtractor = (item, index) => item.caseId;

    _onRefresh = () => {
        switch (CONSTANTS.Env) {
            case Env.DEV_DUMMY:
                this.setState({loading: true});
                let newData = [];
                for (let i = 0; i < CONSTANTS.numberOfItemPerPage; i++) {
                    newData.push(
                        new CaseInListClass(
                            i,
                            'internet',
                            0,
                            i + ' title',
                            'Death Note, di Indonesia juga dikenal dengan judul Dunia Dewa Kematian, adalah judul sebuah serial manga Jepang yang ditulis oleh Tsugumi Ohba dan ilustrasi oleh Takeshi Obata. Manga ini menceritakan tentang Light Yagami, seorang siswa genius yang secara kebetulan menemukan Death Note milik shinigami (dewa kematian). Direalisasikan di majalah Shonen Jump dari Januari 2004 hingga Mei 2006 dengan total 108 bab. Versi tankoubonnya terbit sebanyak 12 jilid dan 1 jilid spesial yang berjudul How to Read 13 yang berisi tentang penjelasan dan profil tentang Death Note. Di Indonesia anime ini ditayangkan oleh SCTV dan Global TV.',
                            '17-May-2016 15:55:04',
                            'Logged',
                            'https://facebook.github.io/react/img/logo_og.png',
                            new CaseLocation(354, '4.202654637500015', '16.068396717309952', 'RN 10, Central African Republic'),
                            new CaseAttachment(5533, 'CASE_20160512_040648-158261009.jpg', 'https://facebook.github.io/react/img/logo_og.png', 'https://facebook.github.io/react/img/logo_og.png', 100, 100),
                            '0',
                            '0',
                            '0',
                            ''
                        )
                    );
                }

                this.setState({
                    data: newData,
                    loading: false,
                    refreshing: false,
                });
                break;
            case Env.DEV:
            case Env.PROD:
                break;
        }
    };

    _onEndReached = () => {
        switch (CONSTANTS.Env) {
            case Env.DEV_DUMMY:
                this.setState({loading: true});
                setTimeout(() => {
                    let newData = [];
                    for (let i = this.state.data.length; i < this.state.data.length + CONSTANTS.numberOfItemPerPage; i++) {
                        newData.push(
                            new CaseInListClass(
                                i + '',
                                'internet',
                                0,
                                i + ' title',
                                'Death Note, di Indonesia juga dikenal dengan judul Dunia Dewa Kematian, adalah judul sebuah serial manga Jepang yang ditulis oleh Tsugumi Ohba dan ilustrasi oleh Takeshi Obata. Manga ini menceritakan tentang Light Yagami, seorang siswa genius yang secara kebetulan menemukan Death Note milik shinigami (dewa kematian). Direalisasikan di majalah Shonen Jump dari Januari 2004 hingga Mei 2006 dengan total 108 bab. Versi tankoubonnya terbit sebanyak 12 jilid dan 1 jilid spesial yang berjudul How to Read 13 yang berisi tentang penjelasan dan profil tentang Death Note. Di Indonesia anime ini ditayangkan oleh SCTV dan Global TV.',
                                '17-May-2016 15:55:04',
                                'Logged',
                                'https://facebook.github.io/react/img/logo_og.png',
                                new CaseLocation(354, '4.202654637500015', '16.068396717309952', 'RN 10, Central African Republic'),
                                new CaseAttachment(5533, 'CASE_20160512_040648-158261009.jpg', 'https://facebook.github.io/react/img/logo_og.png', 'https://www.rtr.at/fileadmin/template/rtr/img/banner-post@hires.jpg', 100, 100),
                                '0',
                                '0',
                                '0',
                                ''
                            )
                        )
                    }
                    this.setState({
                        data: [...this.state.data, ...newData],
                        loading: false,
                    });
                }, 1500);
                break;
            case Env.DEV:
            case Env.PROD:
                break;
        }
    };

    _renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <ListLoadMoreView />
        );
    };

    _renderItem = ({item, index}) => {
        return (
            <NotifInListItem
                item={item}
                onTitlePress={this._onTitlePressed}
                onImagePress={this._onImagePressed}
                onLikePress={this._onLikePressed}
                onCommentPress={this._onCommentPressed}
                onSharePress={this._onSharePressed}
                selected={!!this.state.selected.get(item.caseId)}
            />
        );
    };

    // Events
    _onTitlePressed = (caseId: string) => {
        console.log("_onTitlePressed");
    };

    _onImagePressed = (caseId: string) => {
        console.log("_onImagePressed");
    };

    _onLikePressed = (caseId: string) => {
        this.setState((state) => {
            let newState = state;

            let newLikeState = state.data[caseId].likeState;
            if (newLikeState === '1') {
                newLikeState = '0';
            } else {
                newLikeState = '1';
            }
            newState.data[caseId].likeState = newLikeState;

            const selected = new Map(state.selected);
            selected.set(caseId, !selected.get(caseId)); // toggle
            newState.selected = selected;

            return {newState};
        });
    };

    _onCommentPressed = (caseId: string) => {
        console.log("_onCommentPressed");
    };

    _onSharePressed = (caseId: string) => {
        console.log("_onSharePressed");
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={CONSTANTS.numberOfItemPerPage}
                    ListFooterComponent={this._renderFooter}
                />
            </View>
        );
    }
}