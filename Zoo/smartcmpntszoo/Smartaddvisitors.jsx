import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zoo, form } from '../smartconstszoo/smartstyles';
import { backbutton, clear } from '../smartimprtszoo/smartimgszoo';

const Smartaddvisitors = () => {
    const navigation = useNavigation();
    const [price, setPrice] = useState(null);
    const [date, setDate] = useState(new Date());

    const formatDate = (dateObj) => {
        const dd = String(dateObj.getDate()).padStart(2, '0');
        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
        const yyyy = dateObj.getFullYear();
        return `${dd}.${mm}.${yyyy}`;
    };

    const saveVisitorszoo = async () => {
        if (!price) {
            Alert.alert('Validation error', 'Please enter a price.');
            return;
        }

        try {
            const newVisitor = {
                id: Date.now().toString(),
                price: price,
                date: formatDate(date),
            };

            const existingData = await AsyncStorage.getItem('VISITORS_ZOO');
            const visitors = existingData ? JSON.parse(existingData) : [];

            visitors.push(newVisitor);

            await AsyncStorage.setItem('VISITORS_ZOO', JSON.stringify(visitors));

            Alert.alert('Success', 'Visitor entry saved!');
            navigation.goBack();
        } catch (error) {
            console.error('Error saving visitor:', error);
            Alert.alert('Error', 'Failed to save visitor.');
        }
    };

    return (
        <View style={zoo.container}>

            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Image source={backbutton} style={zoo.backImage} />
            </TouchableOpacity>

            <Text style={zoo.mainTitle}>Add visitors</Text>

            <Text style={form.label}>Arrival date</Text>
            <DateTimePicker 
                value={date} 
                mode="date" 
                display="spinner" 
                themeVariant="dark"
                onChange={(event, selectedDate) => selectedDate && setDate(selectedDate)}
                style={{alignSelf: 'center', maxWidth: 280 }}
            />

            <Text style={form.label}>Price ($)</Text>
            <View style={{ width: '100%' }}>
                <TextInput
                    style={form.input}
                    value={price}
                    onChangeText={(text) => {
                        const numericText = text.replace(/[^0-9]/g, '');
                        setPrice(numericText);
                    }}
                    placeholder='Enter text ...'
                    placeholderTextColor='#837464'
                    keyboardType='numeric'
                />
                {
                    price && (
                        <TouchableOpacity
                            style={form.clearButton}
                            onPress={() => setPrice(null)}
                        >
                            <Image source={clear} style={form.clearIcon} />
                        </TouchableOpacity>
                    )
                }
            </View>

            <TouchableOpacity
                style={[zoo.button, {position: 'static', marginTop: 100}]}
                onPress={saveVisitorszoo}
            >
                <Text style={zoo.buttonText}>Done</Text>
            </TouchableOpacity>
            
        </View>
    )
};

export default Smartaddvisitors;