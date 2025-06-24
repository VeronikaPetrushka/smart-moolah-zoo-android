import { useNavigation } from '@react-navigation/native';
import { useEffect, useState, useCallback } from 'react';

const useSmartMoolahZoonvgthelper = () => {
    const navigation = useNavigation();
    const [activeZooScrn, setActiveZooScrn] = useState('Smarthomezoo');

    const navigateToZooScrn = useCallback((destinationScrnName) => {
        navigation.navigate(destinationScrnName);
    }, [navigation]);

    useEffect(() => {
        const updateActiveZooScrn = () => {
            const state = navigation.getState();
            if (state?.routes?.length) {
                const currentscrn = state.routes[state.index];
                if (currentscrn?.name) {
                    setActiveZooScrn(currentscrn.name);
                }
            }
        };

        updateActiveZooScrn();

        const unsubscribe = navigation.addListener('state', updateActiveZooScrn);

        return unsubscribe;
    }, [navigation]);

    return {
        activeZooScrn,
        navigateToZooScrn
    };
};

export default useSmartMoolahZoonvgthelper;
