/**
 * Created by michael on 4/28/2017.
 */
import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import Camera from "react-native-camera";
import ASSET_HELPER from "../../utils/AssetHelper";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class CameraAndCameraRollScreen extends Component {
    constructor(props) {
        super(props);

        this.camera = null;

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
            },
        };
    }

    takePicture = () => {
        if (this.camera) {
            this.camera.capture()
                .then((data) => console.log(data))
                .catch(err => console.error(err));
        }
    };

    switchType = () => {
        let newType;
        const {back, front} = Camera.constants.Type;

        if (this.state.camera.type === back) {
            newType = front;
        } else if (this.state.camera.type === front) {
            newType = back;
        }

        this.setState({
            camera: {
                ...this.state.camera,
                type: newType,
            },
        });
    };

    get typeIcon() {
        let icon;
        const {back, front} = Camera.constants.Type;

        if (this.state.camera.type === back) {
            icon = ASSET_HELPER.ic_camera_rear_white;
        } else if (this.state.camera.type === front) {
            icon = ASSET_HELPER.ic_camera_front_white;
        }

        return icon;
    }

    switchFlash = () => {
        let newFlashMode;
        const {auto, on, off} = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            newFlashMode = on;
        } else if (this.state.camera.flashMode === on) {
            newFlashMode = off;
        } else if (this.state.camera.flashMode === off) {
            newFlashMode = auto;
        }

        this.setState({
            camera: {
                ...this.state.camera,
                flashMode: newFlashMode,
            },
        });
    };

    get flashIcon() {
        let icon;
        const {auto, on, off} = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            icon = ASSET_HELPER.ic_flash_auto_white;
        } else if (this.state.camera.flashMode === on) {
            icon = ASSET_HELPER.ic_flash_on_white;
        } else if (this.state.camera.flashMode === off) {
            icon = ASSET_HELPER.ic_flash_off_white;
        }

        return icon;
    }

    close = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated
                    hidden
                />
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureTarget={this.state.camera.captureTarget}
                    type={this.state.camera.type}
                    flashMode={this.state.camera.flashMode}
                    onFocusChanged={() => {
                    }}
                    onZoomChanged={() => {
                    }}
                    defaultTouchToFocus
                    mirrorImage={false}
                />
                <View style={[styles.overlay, styles.topOverlay]}>
                    <TouchableOpacity onPress={this.close}>
                        <FontAwesome name="times" size={24} color={'white'}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.flashButton}
                        onPress={this.switchFlash}
                    >
                        <Image
                            source={this.flashIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.overlay, styles.bottomOverlay]}>
                    <TouchableOpacity
                        style={[styles.typeButton, {flex: 1}]}
                        onPress={this.switchType}
                    >
                        <Text
                            style={{fontSize: 18, color: 'white'}}
                        >Gallery
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.captureButton}
                        onPress={this.takePicture}
                    >
                        <Image
                            source={ASSET_HELPER.ic_photo_camera}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.typeButton, {flex: 1, alignItems: 'flex-end'}]}
                        onPress={this.switchType}
                    >
                        <Image
                            source={this.typeIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
    },
    typeButton: {
        padding: 5,
    },
    flashButton: {
        padding: 5,
    },
    buttonsSpace: {
        width: 10,
    },
});
