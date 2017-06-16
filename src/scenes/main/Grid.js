import React, {PureComponent} from "react";
import {Dimensions, FlatList, Image, InteractionManager, StyleSheet, View} from "react-native";
import CONSTANTS from "../../Constants";
import {DataType, Env} from "../../utils/EnumHelper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//Header
import {mainStyle} from "../../styles/Style";
import {EcquariaLogo, NewCaseButton} from "../../components/HeaderRightView";
import {ToggleAllAndMyCases} from "../../components/HeaderCenterView";
// Dummy
import {ecqDummyListCase} from "../../dummies/Dummy";

const gridNumOfColumns = 3;
const gridItemSize = (Dimensions.get('window').width - 20) / gridNumOfColumns;

export default class HomeGrid extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: <ToggleAllAndMyCases
            onTabPress={(index) => navigation.state.params.onTabPress(index)}
        />,
        headerStyle: mainStyle.mainHeader,
        headerLeft: <EcquariaLogo />,
        headerRight: <NewCaseButton navigation={navigation}/>,

        tabBarLabel: 'Grid',
        tabBarIcon: ({tintColor}) => (
            <FontAwesome name="th-large" size={20} color={tintColor}/>
        ),
    });

    constructor(props) {
        super(props);

        this.state = {
            selected: (new Map(): Map<string, boolean>),
            dataType: DataType.AllCases,
            data: [],
            page: 1,
            loading: false,
            refreshing: false,
        };
    }

    componentDidMount() {
        // Tricky part to connect stackNavigator header with component's method.
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({
                onTabPress: this.onDataChange,
            });
        });

        this._onRefresh();
    }

    onDataChange = (index) => {
        this.setState((prevState) => {
                let newState = prevState;

                switch (index) {
                    case 0:
                        newState.dataType = DataType.AllCases;
                        break;
                    case 1:
                        newState.dataType = DataType.MyCases;
                        break;
                }

                return {newState};
            },
            this._onRefresh);
    };

    _keyExtractor = (item, index) => item.caseId;

    _onRefresh = () => {
        switch (CONSTANTS.Env) {
            case Env.DEV_DUMMY:
                let newData = ecqDummyListCase(
                    0,
                    CONSTANTS.numberOfGridItemPerPage,
                    this.state.dataType);
                this.setState({
                    data: newData,
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
                    let newData = ecqDummyListCase(
                        this.state.data.length,
                        CONSTANTS.numberOfGridItemPerPage,
                        this.state.dataType);
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

    _renderItem({item, index}) {

        // Determine margin top and bottom
        let marginTop = 0;
        if (index < gridNumOfColumns) {
            marginTop = 10;
        }

        // Determine margin right and left grid
        const threshold = (index + 1) % gridNumOfColumns;
        let marginLeft = 0;
        let marginRight = 0;

        switch (threshold) {
            case 0:
                marginLeft = 0;
                marginRight = 5;
                break;
            case 1:
                marginLeft = 5;
                marginRight = 0;
                break;
            case 2:
                marginLeft = 5;
                marginRight = 5;
        }

        return (
            <View style={{
                flex: 1,
                marginTop: marginTop,
                marginBottom: 5,
                marginLeft: marginLeft,
                marginRight: marginRight,
                width: gridItemSize,
                height: gridItemSize,
                backgroundColor: '#CCC',
            }}>
                <Image style={{flex: 1}}
                       source={{uri: item.attachments.attachmentUrlThumb}}/>
            </View>
        );
    }

    render() {
        return (<FlatList
            contentContainerStyle={styles.list}
            data={this.state.data}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            onRefresh={this._onRefresh}
            refreshing={this.state.refreshing}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={CONSTANTS.numberOfGridItemPerPage}
        />);
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
    }
});
