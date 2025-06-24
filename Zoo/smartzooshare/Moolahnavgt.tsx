import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import useSmartMoolahZoonvgthelper from './Moolahnvgthandler';
import smartnavigation from '../smartconstszoo/smartnavigation';
import { navigation } from '../smartconstszoo/smartstyles';

const Moolahnavgt: React.FC = () => {
    const { activeZooScrn, navigateToZooScrn } = useSmartMoolahZoonvgthelper();

    return (
        <View style={navigation.container}>

            {
                smartnavigation.map((nvght, k) => (
                    <TouchableOpacity
                        key={k}
                        style={{alignItems: 'center'}}
                        onPress={() => navigateToZooScrn(nvght.scrn)}
                    >
                        <Image
                            source={nvght.icon}
                            style={[
                                navigation.icon,
                                activeZooScrn === nvght.scrn && { tintColor: '#fff' }
                            ]}
                        />
                        <Text style={[navigation.text, activeZooScrn === nvght.scrn && { color: '#fff' }]}>{nvght.text}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

export default Moolahnavgt;