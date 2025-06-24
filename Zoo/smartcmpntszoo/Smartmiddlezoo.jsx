import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { zoo } from '../smartconstszoo/smartstyles';
import { lion } from '../smartimprtszoo/smartimgszoo';

const Smartmiddlezoo = () => {
    const navigation = useNavigation();

    const titleScale = useRef(new Animated.Value(0.5)).current;
    const textContainerScale = useRef(new Animated.Value(0.5)).current;
    const textContainerOpacity = useRef(new Animated.Value(0)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.spring(titleScale, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.spring(textContainerScale, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true,
                }),
                Animated.timing(textContainerOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                })
            ]),
            Animated.timing(buttonOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    return (
        <View style={zoo.container}>

            <Image source={lion} style={zoo.lion} />

            <Animated.Text
                style={[
                    zoo.mainTitle,
                    {
                        transform: [{ scale: titleScale }],
                        alignSelf: 'flex-start',
                        fontSize: 45,
                        lineHeight: 50,
                        marginBottom: 5,
                        marginTop: 30
                    }
                ]}
            >
                Hello, friend!
            </Animated.Text>

            <Animated.Text
                style={[
                    zoo.mainTitle,
                    {
                        transform: [{ scale: titleScale }],
                        alignSelf: 'flex-start',
                        fontSize: 45,
                        lineHeight: 50
                    }
                ]}
            >
                I'm Mooolah
            </Animated.Text>

            <Animated.View
                style={[
                    zoo.textContainer,
                    {
                        transform: [{ scale: textContainerScale }],
                        opacity: textContainerOpacity
                    }
                ]}
            >
                <Text style={zoo.text}>
                    I'm Mooolah, your digital zoo director! Ready to dive into the world of animals and zoo management? Let's get started on our exciting journey!
                </Text>
            </Animated.View>

            <Animated.View
                style={{
                    width: '100%',
                    opacity: buttonOpacity,
                    position: 'absolute',
                    bottom: 50,
                    alignSelf: 'center'
                }}
            >
                <TouchableOpacity
                    style={zoo.button}
                    onPress={() => navigation.navigate('Smarthomezoo')}
                >
                    <Text style={zoo.buttonText}>Continue</Text>
                </TouchableOpacity>
            </Animated.View>
            
        </View>
    )
};

export default Smartmiddlezoo;