import React, { ReactNode } from 'react';
import { ImageBackground, View } from 'react-native';

import Moolahnavgt from './Moolahnavgt';

import { background } from '../smartconstszoo/smartstyles';
import { zoobackgroundmoolah } from '../smartimprtszoo/smartimgszoo';

interface MoolahbckgrhandlerProps {
    child: ReactNode;
    isNav?: boolean;
}

const Moolahbckgrhandler: React.FC<MoolahbckgrhandlerProps> = ({ child, isNav }) => {
    return (
        <ImageBackground source={zoobackgroundmoolah} style={{flex: 1}}>
            <View style={background.zoo}>{child}</View>

            {isNav && (
                <View style={background.navigation}>
                    <Moolahnavgt />
                </View>
            )}  
        </ImageBackground>
      
    );
};

export default Moolahbckgrhandler;
