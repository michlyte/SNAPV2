/**
 * Created by michael on 6/12/2017.
 */
import React, {PureComponent} from "react";
import {
    Image,
    Text,
    View,
    TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import ASSET_HELPER from "../utils/AssetHelper";
import StyImages from "../styles/Image";
import StyText from "../styles/Text";

export default class NotifListItem extends PureComponent {
    constructor(props) {
        super(props);

        this.fpUrl = (this.props.item.friendPictureUrl ? {uri: this.props.item.friendPictureUrl} : ASSET_HELPER.img_no_profile_picture);

        this.prefix = '';
        this.suffix = '';
        if (this.props.item.body !== null) {
            let n = this.props.item.body.search(this.props.item.caseTitle);

            if (n > 0) {
                this.prefix = this.props.item.body.substring(0, n);
            }

            if ((n + this.props.item.caseTitle.length) < (this.props.item.body.length)) {
                this.suffix = this.props.item.body.substring((n + this.props.item.caseTitle.length), this.props.item.body.length);
            }
        }
    }

    _onCasePressed = () => {
        this.props.onCasePress(this.props.item.notificationId);
    };

    _onUserPressed = () => {
        this.props.onUserPress(this.props.item.notificationId);
    };

    render() {
        return (
            <View style={{flex: 1, marginBottom: 15}}>
                <View style={{flexDirection: 'row'}}>
                    {/* Friend profile picture */}
                    <Image
                        style={StyImages.friendPictureNotif}
                        source={this.fpUrl}
                    />
                    {/* Message */}
                    <View
                        style={{flex: 1, marginLeft: 10, marginRight: 10}}
                    >
                        <Text style={StyText.messageNotif}>
                            <Text>{this.prefix}</Text>
                            <Text
                                onPress={this._onCasePressed}
                                style={{fontWeight: 'bold'}}
                            >
                                {this.props.item.caseTitle}
                            </Text>
                            <Text>{this.suffix}</Text>
                        </Text>
                    </View>
                    {/* Image */}
                    <TouchableOpacity onPress={this._onCasePressed}>
                        <Image
                            style={StyImages.attachmentThumbNotif}
                            source={{uri: this.props.item.attachmentUrlThumb}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

NotifListItem.propTypes = {
    item: PropTypes.object.isRequired,
    onCasePress: PropTypes.func.isRequired,
    onUserPress: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
};