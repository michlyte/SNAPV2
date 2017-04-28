/**
 * Created by michael on 4/28/2017.
 */
import React, { Component } from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Camera from 'react-native-camera';
import IMAGES from '../../Images';

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
            isRecording: false
        };
    }

    takePicture = () => {
        if (this.camera) {
            this.camera.capture()
                .then((data) => console.log(data))
                .catch(err => console.error(err));
        }
    }

    startRecording = () => {
        if (this.camera) {
            this.camera.capture({mode: Camera.constants.CaptureMode.video})
                .then((data) => console.log(data))
                .catch(err => console.error(err));
            this.setState({
                isRecording: true
            });
        }
    }

    stopRecording = () => {
        if (this.camera) {
            this.camera.stopCapture();
            this.setState({
                isRecording: false
            });
        }
    }

    switchType = () => {
        let newType;
        const { back, front } = Camera.constants.Type;

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
    }

    get typeIcon() {
        let icon;
        const { back, front } = Camera.constants.Type;

        if (this.state.camera.type === back) {
            icon = IMAGES.ic_camera_rear_white;
        } else if (this.state.camera.type === front) {
            icon = IMAGES.ic_camera_front_white;
        }

        return icon;
    }

    switchFlash = () => {
        let newFlashMode;
        const { auto, on, off } = Camera.constants.FlashMode;

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
    }

    get flashIcon() {
        let icon;
        const { auto, on, off } = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            icon = IMAGES.ic_flash_auto_white;
        } else if (this.state.camera.flashMode === on) {
            icon = IMAGES.ic_flash_on_white;
        } else if (this.state.camera.flashMode === off) {
            icon = IMAGES.ic_flash_off_white;
        }

        return icon;
    }

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
                    onFocusChanged={() => {}}
                    onZoomChanged={() => {}}
                    defaultTouchToFocus
                    mirrorImage={false}
                />
                <View style={[styles.overlay, styles.topOverlay]}>
                    <TouchableOpacity
                        style={styles.typeButton}
                        onPress={this.switchType}
                    >
                        <Image
                            source={this.typeIcon}
                        />
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
                    {
                        !this.state.isRecording
                        &&
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={this.takePicture}
                        >
                            <Image
                                source={IMAGES.ic_photo_camera}
                            />
                        </TouchableOpacity>
                        ||
                        null
                    }
                    <View style={styles.buttonsSpace} />
                    {
                        !this.state.isRecording
                        &&
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={this.startRecording}
                        >
                            <Image
                                source={IMAGES.ic_videocam}
                            />
                        </TouchableOpacity>
                        ||
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={this.stopRecording}
                        >
                            <Image
                                source={IMAGES.ic_stop}
                            />
                        </TouchableOpacity>
                    }
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
