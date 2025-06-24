import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zoo, card } from '../smartconstszoo/smartstyles';
import { nothingadded } from '../smartimprtszoo/smartimgszoo';

const Smarthomezoo = () => {
    const navigation = useNavigation();
    const [animals, setAnimals] = useState([]);
    const [enclosure, setEnclosure] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
            try {
                const storedAnimals = await AsyncStorage.getItem('ANIMALS');
                const storedEnclosure = await AsyncStorage.getItem('ENCLOSURES');
                if (storedAnimals) setAnimals(JSON.parse(storedAnimals));
                else setAnimals([]);
                if (storedEnclosure) setEnclosure(JSON.parse(storedEnclosure));
                else setEnclosure([]);
            } catch (error) {
                console.log('Error loading data:', error);
            }
            };

            fetchData();

        }, [])
    );

    return (
        <View style={zoo.container}>

            <Text style={zoo.mainTitle}>Home</Text>

            {
                (enclosure.length === 0 && animals.length === 0) && (
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Image
                            source={nothingadded}
                            style={[zoo.nothingImg, {width: 180, height: 180}]}
                        />
                        <Text style={zoo.nothingText}>You don't have anything here yet</Text>
                    </View>
                )
            }

            {
                (enclosure.length > 0 || animals.length > 0) && (
                    <ScrollView style={{width: '100%'}}>
                        <Text style={zoo.subtitle}>Animals</Text>
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
                                                <View style={[zoo.row, {justifyContent: 'space-between'}]}>
                                                    <Text style={card.name}>{animal.name}</Text>
                                                    <View style={card.categoryContainer}>
                                                        <Text style={card.categoryText}>{animal.category}</Text>
                                                    </View>
                                                </View>
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

                        <Text style={[zoo.subtitle, {marginTop: 20}]}>Enclosure</Text>
                        {
                            enclosure.length > 0 ? (
                                <View style={{width: '100%'}}>
                                    {
                                        enclosure.map((cage, j) => (
                                            <TouchableOpacity
                                                key={j}
                                                style={card.container}
                                                onPress={() => navigation.navigate('Smartanimalinfo', { item: cage, type: 'enclosure' })}
                                            >
                                                <Text style={card.name}>{cage.cage}</Text>
                                                <View style={[card.categoryContainer, { maxWidth: 160, alignItems: 'center', justifyContent: 'center', marginTop: 7}]}>
                                                    <Text style={card.categoryText}>{cage.status}</Text>
                                                </View>
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

                        <View style={{height: 400}} />
                    </ScrollView>
                )
            }

            <View style={{width: '100%', position: 'absolute', bottom: 120, alignSelf: 'center'}}>
                <TouchableOpacity
                    style={[zoo.button, {marginBottom: 7}]}
                    onPress={() => navigation.navigate('Smartaddanimal')}
                >
                    <Text style={zoo.buttonText}>Add animal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[zoo.button, {backgroundColor: '#fff'}]}
                    onPress={() => navigation.navigate('Smartaddenclosure')}
                >
                    <Text style={[zoo.buttonText, {color: '#000'}]}>Add an enclosure</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
};

export default Smarthomezoo;