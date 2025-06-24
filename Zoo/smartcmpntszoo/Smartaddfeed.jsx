import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zoo, form, card } from '../smartconstszoo/smartstyles';
import { backbutton, clear } from '../smartimprtszoo/smartimgszoo';
import { nothingadded, checked } from '../smartimprtszoo/smartimgszoo';

const Smartaddfeed = ({ feed }) => {
    const navigation = useNavigation();
    
    const [animals, setAnimals] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState(feed ? feed.selectedAnimal : null);

    const [feedName, setFeedName] = useState(feed ? feed.feedName : null);
    const [quantity, setQuantity] = useState(feed ? feed.quantity : null);
    const [price, setPrice] = useState(feed ? feed.price : null);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const storedAnimals = await AsyncStorage.getItem('ANIMALS');
                    if (storedAnimals) setAnimals(JSON.parse(storedAnimals));
                    else setAnimals([]);
                } catch (error) {
                    console.log('Error loading data:', error);
                }
            };

            fetchData();

        }, [])
    );

    const saveFeedentryzoo = async () => {
        if (!selectedAnimal) {
            Alert.alert('Validation Error', 'Please select an animal.');
            return;
        }
        if (!feedName || !quantity || !price) {
            Alert.alert('Validation Error', 'Please fill in all the fields.');
            return;
        }

        try {
            const newFeedEntry = {
                id: Date.now().toString(),
                selectedAnimal: {
                    id: selectedAnimal.id,
                    name: selectedAnimal.name,
                    category: selectedAnimal.category,
                },
                feedName,
                quantity,
                price,
            };

            const existingData = await AsyncStorage.getItem('FEED_ZOO');
            const feedEntries = existingData ? JSON.parse(existingData) : [];

            feedEntries.push(newFeedEntry);

            await AsyncStorage.setItem('FEED_ZOO', JSON.stringify(feedEntries));

            Alert.alert('Success', 'Feed entry saved!');
            navigation.goBack();
        } catch (error) {
            console.error('Error saving feed entry:', error);
            Alert.alert('Error', 'Failed to save feed entry.');
        }
    };
    
    return (
        <View style={zoo.container}>

            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Image source={backbutton} style={zoo.backImage} />
            </TouchableOpacity>

            <Text style={zoo.mainTitle}>Add feed</Text>

            <ScrollView style={{ width: '100%' }}>
                {
                    animals.length > 0 ? (
                        <View style={{width: '100%'}}>
                            {
                                animals.map((animal, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={card.container}
                                        onPress={() => navigation.navigate('Smartanimalinfo', { item: animal, type: 'animal' })}
                                    >
                                        <View style={[zoo.row, {justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}]}>
                                            <View style={card.categoryContainer}>
                                                <Text style={card.categoryText}>{animal.category}</Text>
                                            </View>
                                            <TouchableOpacity
                                                style={form.checkedButton}
                                                onPress={() =>
                                                    selectedAnimal?.id === animal.id
                                                        ? setSelectedAnimal(null)
                                                        : setSelectedAnimal(animal)
                                                }
                                            >
                                                {
                                                    selectedAnimal?.id === animal.id && (
                                                        <Image
                                                            source={checked}
                                                            style={form.checkedIcon}
                                                        />
                                                    )
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    <Text style={[card.name, { marginBottom: 2}]}>{animal.name}</Text>
                                        <Text style={card.date}>{animal.arrivaldate}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    ) : (
                            <View style={{width: '100%', alignItems: 'center'}}>
                                <Image source={nothingadded} style={zoo.nothingImg} />
                                <Text style={zoo.nothingText}>You don't have anything here yet</Text>
                            </View>
                    )
                }

                {[
                    { label: 'Feed Name', value: feedName, setter: setFeedName },
                    { label: 'Quantity (kg)', value: quantity, setter: setQuantity },
                    { label: 'Price ($)', value: price, setter: setPrice },
                ].map((field, idx) => (
                    <View key={idx}>
                        <Text style={form.label}>{field.label}</Text>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                style={form.input}
                                value={field.value}
                                onChangeText={(text) => {
                                    if (field.label === 'Feed Name') {
                                    // Allow any text
                                    field.setter(text);
                                    } else {
                                    // Allow only numbers
                                    const numericText = text.replace(/[^0-9]/g, '');
                                    field.setter(numericText);
                                    }
                                }}
                                placeholder='Enter text ...'
                                placeholderTextColor='#837464'
                                keyboardType={field.label === 'Feed Name' ? 'default' : 'numeric'}
                            />
                            {field.value && (
                                <TouchableOpacity style={form.clearButton} onPress={() => field.setter('')}>
                                    <Image source={clear} style={form.clearIcon} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                ))}
                
                <View style={{height: 150}} />
            </ScrollView>

            {
                animals.length === 0 ? (
                    <TouchableOpacity
                        style={[zoo.button, {bottom: 50}]}
                        onPress={() => navigation.navigate('Smartaddanimal')}
                    >
                        <Text style={zoo.buttonText}>Add animal</Text>
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity
                            style={[zoo.button, {bottom: 50}]}
                            onPress={saveFeedentryzoo}
                        >
                            <Text style={zoo.buttonText}>Done</Text>
                        </TouchableOpacity>
                )
            }
            
        </View>
    )
};

export default Smartaddfeed;