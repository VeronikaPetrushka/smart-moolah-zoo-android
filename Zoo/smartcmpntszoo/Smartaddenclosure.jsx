import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zoo, form } from '../smartconstszoo/smartstyles';
import { backbutton, clear } from '../smartimprtszoo/smartimgszoo';

const Smartaddenclosure = ({ enclosure }) => {
    const navigation = useNavigation();
    const [cage, setCage] = useState(enclosure ? enclosure.cage : null);
    const [status, setStatus] = useState(enclosure ? enclosure.status : null);

    const saveEnclosureentry = async () => {
        if (!cage || !status) {
            Alert.alert('Missing information', 'Please fill in both the cage and status.');
            return;
        }
        
        try {
            const stored = await AsyncStorage.getItem('ENCLOSURES');
            const enclosures = stored ? JSON.parse(stored) : [];

            const newEnclosure = {
                id: enclosure?.id || Date.now().toString(),
                cage,
                status
            };

            let updated;
            if (enclosure) {
                updated = enclosures.map(e => e.id === enclosure.id ? newEnclosure : e);
            } else {
                updated = [...enclosures, newEnclosure];
            }

            await AsyncStorage.setItem('ENCLOSURES', JSON.stringify(updated));
            navigation.navigate('Smarthomezoo');
        } catch (e) {
            Alert.alert('Error', 'Could not save the entry.');
            console.log('Save error:', e);
        }
    };

    return (
        <View style={zoo.container}>

            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Image source={backbutton} style={zoo.backImage} />
            </TouchableOpacity>

            <Text style={zoo.mainTitle}>{enclosure ? 'Edit an enclosure' : 'Add an enclosure'}</Text>

            <Text style={form.label}>Cage</Text>
            <View style={{ width: '100%' }}>
                <TextInput
                    style={form.input}
                    value={cage}
                    onChangeText={setCage}
                    placeholder='Enter text ...'
                    placeholderTextColor='#837464'
                />
                {
                    cage && (
                        <TouchableOpacity
                            style={form.clearButton}
                            onPress={() => setCage(null)}
                        >
                            <Image source={clear} style={form.clearIcon} />
                        </TouchableOpacity>
                    )
                }
            </View>

            <Text style={form.label}>Cage status</Text>
            <View style={[zoo.row, {justifyContent: 'flex-start', flexWrap: 'wrap'}]}>
                {
                    ['✅ All good', '🧹 Cleaning needed', '🚫 In quarantine'].map((st, j) => (
                        <TouchableOpacity
                            key={j}
                            style={[form.categoryButton, status === st && { backgroundColor: '#837464' }]}
                            onPress={() => setStatus(st)}
                        >
                            <Text style={[form.categoryButtonText, status === st && {fontWeight: '800'}]}>{st}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>

            <TouchableOpacity
                style={[zoo.button, {position: 'static', marginTop: 100}]}
                onPress={saveEnclosureentry}
            >
                <Text style={zoo.buttonText}>Done</Text>
            </TouchableOpacity>
            
        </View>
    )
};

export default Smartaddenclosure;