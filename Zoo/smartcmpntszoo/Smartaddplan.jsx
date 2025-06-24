import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { zoo, form, card } from '../smartconstszoo/smartstyles';
import { backbutton, checked, setarow } from '../smartimprtszoo/smartimgszoo';

const Smartaddplan = ({ plan }) => {
    const navigation = useNavigation();
    const [step, setStep] = useState(0);
    const [category, setCategory] = useState(plan ? plan.category : null);
    const [selectedAnimal, setSelectedAnimal] = useState(plan ? plan.selectedAnimal : null);
    const [animals, setAnimals] = useState([]);
    const [type, setType] = useState(plan ? plan.type : null);
    const [frequency, setFrequency] = useState(plan ? plan.frequency : null);

    const [showTypes, setShowTypes] = useState(false);
    const [showFrequency, setShowFrequency] = useState(false);

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

    const smartInputparserzoo = (input, type = 'date') => {
        if (!input) return new Date();

        if (typeof input === 'string') {
            // Time format: "10:30 AM"
            if (type === 'time') {
                const [time, modifier] = input.split(' ');
                let [hours, minutes] = time.split(':').map(Number);
                if (modifier === 'PM' && hours < 12) hours += 12;
                if (modifier === 'AM' && hours === 12) hours = 0;
                const date = new Date();
                date.setHours(hours, minutes, 0);
                return date;
            }

            // Date format: "dd.mm.yyyy"
            const parts = input.split('.');
            if (parts.length === 3) {
                return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            }

            const parsed = new Date(input);
            if (!isNaN(parsed.getTime())) return parsed;
        }

        return new Date(input);
    };

    const [date, setDate] = useState(plan ? smartInputparserzoo(plan.date) : new Date());
    const [time, setTime] = useState(plan ? smartInputparserzoo(plan.time) : new Date());

    const saveAnimalplan = async () => {
        if (!category || !selectedAnimal || !type || !frequency) {
            let missing = [];
            if (!category) missing.push('category');
            if (!selectedAnimal) missing.push('animal');
            if (!type) missing.push('reminder type');
            if (!frequency) missing.push('frequency');

            Alert.alert('Missing fields', `Please select: ${missing.join(', ')}`);
            return;
        }

        const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
        const formattedTime = format(time, 'h:mm a');

        const newPlan = {
            id: plan?.id || Date.now().toString(),
            category,
            selectedAnimal,
            type,
            frequency,
            date: formattedDate,
            time: formattedTime,
        };

        try {
            const storedPlans = await AsyncStorage.getItem('PLANS_ZOO');
            const parsedPlans = storedPlans ? JSON.parse(storedPlans) : [];

            let updatedPlans;
            if (plan) {
                updatedPlans = parsedPlans.map(p => p.id === plan.id ? newPlan : p);
            } else {
                updatedPlans = [...parsedPlans, newPlan];
            }

            await AsyncStorage.setItem('PLANS_ZOO', JSON.stringify(updatedPlans));
            navigation.navigate('Smartplanzoo');
        } catch (error) {
            console.log('Error saving plan:', error);
            Alert.alert('Error', 'Something went wrong while saving the plan.');
        }
    };

    const filteredAnimals = animals.filter(animal => !category || animal.category === category);
    
    return (
        <View style={zoo.container}>

            <TouchableOpacity
                onPress={() => step > 0 ? setStep(step - 1) : navigation.goBack()}
            >
                <Image source={backbutton} style={zoo.backImage} />
            </TouchableOpacity>

            <Text style={zoo.mainTitle}>{plan ? 'Edit plan' : 'Add plan'}</Text>

            {
                step === 0 && (
                    <View style={{ width: '100%', flexGrow: 1 }}>
                        
                        <Text style={form.label}>Category</Text>
                        {
                            ['🐘 Mammals', '🐦 Birds', '🦎 Reptiles', '🐞 Insects'].map((cat, j) => (
                                <TouchableOpacity
                                    key={j}
                                    style={[form.typeButton, category === cat && { backgroundColor: '#837464' }]}
                                    onPress={() => setCategory(cat)}
                                >
                                    <Text style={[form.typeButtonText, category === cat && {fontWeight: '800'}]}>{cat}</Text>
                                </TouchableOpacity>
                            ))
                        }

                    </View>
                )
            }

            {
                step === 1 && (
                    <ScrollView style={{ width: '100%' }}>
                        {
                            animals.length > 0 ? (
                                <View style={{width: '100%'}}>
                                    {
                                        filteredAnimals.map((animal, i) => (
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
                        <View style={{height: 150}} />
                    </ScrollView>
                )
            }

            {
                step === 2 && (
                    <ScrollView style={{ width: '100%' }}>

                        <TouchableOpacity
                            style={[form.typeButton, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12}]}
                            onPress={() => setShowTypes((prev) => !prev)}
                        >
                            <Text style={form.typeButtonText}>Reminder type</Text>
                            <Image
                                source={setarow}
                                style={{
                                    width: 15, height: 15, resizeMode: 'contain',
                                    transform: showTypes ? [{ rotate: '-90deg' }] : [{ rotate: '90deg' }]
                                }}
                            />
                        </TouchableOpacity>
                        {
                            showTypes && (
                                <>
                                    {
                                        ['Feeding', 'Health check', 'Relocation'].map((tp, j) => (
                                            <View key={j} style={[zoo.row, {marginBottom: 7}]}>
                                                <TouchableOpacity
                                                    style={form.selectedButton}
                                                    onPress={() => type === tp 
                                                        ? setType(null)
                                                        : setType(tp)
                                                    }
                                                >
                                                    {
                                                        type === tp && (
                                                            <View style={form.selected} />
                                                        )
                                                    }
                                                </TouchableOpacity>
                                                <Text style={[form.typeButtonText, {fontWeight: '600'}]}>{tp}</Text>
                                            </View>
                                        ))
                                    }
                                </>
                            )
                        }

                        <Text style={[form.label, {marginTop: 12}]}>Date</Text>
                        <DateTimePicker 
                            value={date} 
                            mode="date" 
                            display="spinner" 
                            themeVariant="dark"
                            onChange={(event, selectedDate) => selectedDate && setDate(selectedDate)}
                            style={{alignSelf: 'center', maxWidth: 280 }}
                        />

                        <Text style={form.label}>Time</Text>
                        <DateTimePicker 
                            value={time} 
                            mode="time" 
                            display="spinner" 
                            themeVariant="dark"
                            onChange={(event, selectedTime) => selectedTime && setTime(selectedTime)}
                            style={{alignSelf: 'center', maxWidth: 280 }}
                        />

                        <TouchableOpacity
                            style={[form.typeButton, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}
                            onPress={() => setShowFrequency((prev) => !prev)}
                        >
                            <Text style={form.typeButtonText}>Frequency</Text>
                            <Image
                                source={setarow}
                                style={{
                                    width: 15, height: 15, resizeMode: 'contain',
                                    transform: showFrequency ? [{ rotate: '-90deg' }] : [{ rotate: '90deg' }]
                                }}
                            />
                        </TouchableOpacity>
                        {
                            showFrequency && (
                                <>
                                    {
                                        ['Daily', 'Weekly', 'Monthly'].map((freq, j) => (
                                            <View key={j} style={[zoo.row, {marginBottom: 7}]}>
                                                <TouchableOpacity
                                                    style={form.selectedButton}
                                                    onPress={() => frequency === freq 
                                                        ? setFrequency(null)
                                                        : setFrequency(freq)
                                                    }
                                                >
                                                    {
                                                        frequency === freq && (
                                                            <View style={form.selected} />
                                                        )
                                                    }
                                                </TouchableOpacity>
                                                <Text style={[form.typeButtonText, {fontWeight: '600'}]}>{freq}</Text>
                                            </View>
                                        ))
                                    }
                                </>
                            )
                        }

                        <View style={{height: 150}} />
                    </ScrollView>
                )
            }

            {
                (step === 1 && filteredAnimals.length === 0) ? (
                    <TouchableOpacity
                        style={[zoo.button, {bottom: 50}]}
                        onPress={() => navigation.navigate('Smartaddanimal')}
                    >
                        <Text style={zoo.buttonText}>Add animal</Text>
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity
                            style={[zoo.button, {bottom: 50}]}
                            onPress={() => step < 2 ? setStep(step + 1) : saveAnimalplan()}
                        >
                            <Text style={zoo.buttonText}>Done</Text>
                        </TouchableOpacity>
                )
            }
            
        </View>
    )
};

export default Smartaddplan;