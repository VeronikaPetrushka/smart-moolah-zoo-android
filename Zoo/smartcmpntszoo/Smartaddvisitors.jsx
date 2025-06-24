import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zoo, form } from '../smartconstszoo/smartstyles';
import { backbutton, clear } from '../smartimprtszoo/smartimgszoo';

const Smartaddvisitors = () => {
    const navigation = useNavigation();
    const [price, setPrice] = useState(null);
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleUnifiedConfirm = (selectedDate) => {
        const trimmed = new Date(selectedDate.setHours(0, 0, 0, 0));
        setDate(trimmed);
        setDatePickerVisibility(false);
    };

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

            <TouchableOpacity
                onPress={() => setDatePickerVisibility(true)}
                style={[
                    form.typeButton,
                    { justifyContent: 'flex-start', alignItems: 'flex-start' }
                ]}
            >
                <Text style={form.typeButtonText}>{formatDate(date)}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={date}
                onConfirm={handleUnifiedConfirm}
                onCancel={() => setDatePickerVisibility(false)}
                themeVariant="dark"
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