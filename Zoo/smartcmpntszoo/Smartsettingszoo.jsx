import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Switch, Alert, Linking, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zoo, settings } from '../smartconstszoo/smartstyles';
import { setarow } from '../smartimprtszoo/smartimgszoo';

const Smartsettingszoo = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState({
        Tasks: false,
        Events: false,
        Feeds: false
    });
    const [heightAnim] = useState(new Animated.Value(0));
    const [rotateAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        const loadNotificationSettings = async () => {
            const stored = await AsyncStorage.getItem('NOTIFICATIONS_ZOO');
            if (stored) {
                setNotifications(JSON.parse(stored));
            }
        };
        loadNotificationSettings();
    }, []);

    const toggleNotification = async (type) => {
        const updated = { ...notifications, [type]: !notifications[type] };
        setNotifications(updated);
        await AsyncStorage.setItem('NOTIFICATIONS_ZOO', JSON.stringify(updated));
    };

    const toggleNotificationsSection = () => {
        setShowNotifications(prev => {
            if (!prev) {
                Animated.parallel([
                    Animated.timing(heightAnim, {
                        toValue: 1,
                        duration: 300,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: false
                    }),
                    Animated.timing(rotateAnim, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true
                    })
                ]).start();
            } else {
                Animated.parallel([
                    Animated.timing(heightAnim, {
                        toValue: 0,
                        duration: 250,
                        easing: Easing.in(Easing.ease),
                        useNativeDriver: false
                    }),
                    Animated.timing(rotateAnim, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true
                    })
                ]).start();
            }
            return !prev;
        });
    };

    const clearAllData = () => {
        Alert.alert(
            'Confirm Clear',
            'Are you sure you want to delete all saved zoo data?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete All',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await AsyncStorage.clear();
                            Alert.alert('Success', 'All data has been cleared.');
                        } catch (e) {
                            Alert.alert('Error', 'Could not clear data.');
                            console.log('Clear error:', e);
                        }
                    }
                }
            ]
        );
    };

    const moolahSmartZoopp = () => {
        const url = 'https://www.termsfeed.com/live/253cdc11-4d52-40a0-849e-021e566760af';
        Linking.openURL(url).catch(() =>
            Alert.alert('Error', 'Unable to open Privacy Policy link.')
        );
    };

    const notificationHeight = heightAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 210]
    });

    const rotateArrow = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-90deg']
    });

    return (
        <View style={zoo.container}>
            <View style={{width: '100%', flexGrow: 1}}>
                <Text style={zoo.mainTitle}>Settings</Text>

                <View style={settings.buttonsWrapper}>
                    <TouchableOpacity
                        style={settings.button}
                        onPress={toggleNotificationsSection}
                    >
                        <Text style={settings.buttonText}>Notifications</Text>
                        <Animated.Image
                            source={setarow}
                            style={{
                                width: 15,
                                height: 15,
                                transform: [{ rotate: rotateArrow }]
                            }}
                        />
                    </TouchableOpacity>

                    <Animated.View style={{ height: notificationHeight, overflow: 'hidden' }}>
                        <View style={{ height: 10 }} />
                        
                        <View style={{width: '100%', paddingHorizontal: 20}}>
                            {['Tasks', 'Events', 'Feeds'].map((notif, k) => (
                                <View key={k} style={settings.notifButton}>
                                    <Text style={settings.buttonText}>{notif}</Text>
                                    <Switch
                                        value={notifications[notif]}
                                        onValueChange={() => toggleNotification(notif)}
                                        trackColor={{ false: '#ccc', true: '#34C759' }}
                                        thumbColor="#fff"
                                    />
                                </View>
                            ))}
                        </View>

                    </Animated.View>

                    <TouchableOpacity
                        style={settings.button}
                        onPress={moolahSmartZoopp}
                    >
                        <Text style={settings.buttonText}>Privacy Policy</Text>
                        <Image
                            source={setarow}
                            style={{ width: 15, height: 15 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                style={[zoo.button, { backgroundColor: '#FF2424', bottom: 120 }]}
                onPress={clearAllData}
            >
                <Text style={[zoo.buttonText, {color: '#fff'}]}>Clear all data</Text>
            </TouchableOpacity>
        </View>
    )
};

export default Smartsettingszoo;