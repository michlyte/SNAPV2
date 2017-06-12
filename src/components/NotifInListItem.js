/**
 * Created by michael on 6/12/2017.
 */
import React, {PureComponent} from "react";
import {StyleSheet, Image, Text, TouchableOpacity, View, Dimensions} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class NotifInListItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    _onLikePressed = () => {
        this.props.onLikePress(this.props.item.caseId);
    };

    _onCommentPressed = () => {
        this.props.onCommentPress(this.props.item.caseId);
    };

    _onSharePressed = () => {
        this.props.onSharePress(this.props.item.caseId);
    };

    render() {
        let likeIcon = null;
        if (this.props.item.likeState === '1') {
            likeIcon = "heart";
        } else {
            likeIcon = "heart-o";
        }

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
                        <Image style={styles.profilePicture} source={{uri: this.props.item.userPictureUrl}}/>
                        <Text style={styles.title}>{this.props.item.caseTitle}</Text>
                    </View>

                    {/*<Image style={{width: 40, height: 40, borderRadius: 20, marginRight: 20}}*/}
                    {/*source={{uri: 'http://placehold.it/100x100'}}/>*/}
                </View>

                {/* Image */}

                <Image style={styles.image} source={{uri: this.props.item.attachments.attachmentUrlThumb}}/>

                {/* Bar Actions */}

                <View
                    style={[styles.layout, {flexDirection: 'row', height: 60, alignItems: 'center'}]}
                >
                    <TouchableOpacity onPress={this._onLikePressed}>
                        <FontAwesome name={likeIcon} size={25}/>
                    </TouchableOpacity>

                    <View style={styles.space}/>

                    <TouchableOpacity onPress={this._onCommentPressed}>
                        <FontAwesome name="comment-o" size={25}/>
                    </TouchableOpacity>

                    <View style={styles.space}/>

                    <TouchableOpacity onPress={this._onSharePressed}>
                        <FontAwesome name="share" size={25}/>
                    </TouchableOpacity>
                </View>

                {/* Bar Description */}

                <View style={[styles.layout, {paddingBottom: 20}]}>
                    <Text numberOfLines={4} style={styles.description}>
                        {this.props.item.caseDetails}
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