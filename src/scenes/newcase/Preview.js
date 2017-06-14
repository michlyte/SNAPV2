/**
 * Created by michael on 6/14/2017.
 */
import React, {Component} from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Carousel from "react-native-snap-carousel";
import ImagePicker from 'react-native-image-crop-picker';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export default class Preview extends Component {
    constructor(props) {
        super(props);

        this.iconSize = 30;
        this.iconColor = 'white';
        this.iconMinus = 'minus';
        this.iconPlus = 'plus';
        this.iconCheck = 'check';

        this.no_image = 'http://7bna.net/wallpapers/picture.html';

        this.state = {
            index: 0,
            data: [
                {
                    path: 'file:///storage/emulated/0/DCIM/IMG_20170614_095951.jpg',
                },
                {
                    path: 'https://static.greatbigcanvas.com/categories/lindstrand-doug-2380.jpg',
                },
            ],
        };
    }

    // Remove item from data
    removeItem = (index) => {
        this.setState((prevState) => ({
            data: prevState.data.filter((_, i) => i !== index)
        }));
    };

    onMinus = () => {
        this.removeItem(this.state.index);
    };

    onPlus = () => {
        console.log("onPlus");

        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            console.log(images);
        });
    };

    onCheck = () => {
        console.log(this.state.data);
    };

    onSnapToItem = (index) => {
        console.log(index);
        this.setState({
            index: index,
        });
    };

    render() {
        console.log("Preview: render()");

        const {params} = this.props.navigation.state;

        let carousel = null;
        if (this.state.data.length > 0) {
            // Populate images
            let images = [];
            for (let i = 0; i < this.state.data.length; i++) {
                images.push(
                    <Image
                        key={i}
                        style={{height: viewportHeight}}
                        source={{uri: this.state.data[i].path}}
                    />
                );
            }

            // Image slider
            carousel = <Carousel
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                slideStyle={{width: viewportWidth}}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                firstItem={this.state.index}
                onSnapToItem={this.onSnapToItem}
            >
                {images}
            </Carousel>;
        } else {
            carousel = <View style={styles.containerEmpty}>
                <Text style={styles.textEmpty}>No Image</Text>
            </View>;
        }

        return (
            <View>
                {carousel}

                <View style={styles.bottomOverlay}>
                    <TouchableOpacity onPress={this.onMinus}>
                        <View style={[styles.icon, {marginLeft: 20}]}>
                            <Icon
                                name={this.iconMinus}
                                size={this.iconSize}
                                color={this.iconColor}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onPlus}>
                        <View style={styles.icon}>
                            <Icon
                                name={this.iconPlus}
                                size={this.iconSize}
                                color={this.iconColor}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onCheck}>
                        <View style={[styles.icon, {marginRight: 20}]}>
                            <Icon
                                name={this.iconCheck}
                                size={this.iconSize}
                                color={this.iconColor}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerEmpty: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textEmpty: {
        fontSize: 18,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomOverlay: {
        position: 'absolute',
        bottom: 0,
        width: viewportWidth,
        height: 80,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});