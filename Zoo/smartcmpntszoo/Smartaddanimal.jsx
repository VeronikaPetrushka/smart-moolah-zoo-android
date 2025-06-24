import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { zoo, form } from '../smartconstszoo/smartstyles';
import { backbutton, checked, clear, holder } from '../smartimprtszoo/smartimgszoo';

const Smartaddanimal = ({ animal }) => {
    const navigation = useNavigation();
    const [step, setStep] = useState(0);
    const [image, setImage] = useState(animal ? animal.image : null);
    const [animall, setAnimall] = useState(animal ? animal.animall : null);
    const [category, setCategory] = useState(animal ? animal.category : null);
    const [name, setName] = useState(animal ? animal.name : null);
    const [cage, setCage] = useState(animal ? animal.cage : null);
    const [ration, setRation] = useState(animal ? animal.ration : null);
    const [healthcard, setHealthcard] = useState(animal ? animal.healthcard : null);
    const [rarespecies, setRarespecies] = useState(animal ? animal.rarespecies : false);
    const [type, setType] = useState(animal ? animal.type : null);
    const [description, setDescription] = useState(animal ? animal.description : null);

    const smartDateparserzoo = (input) => {
        if (!input) return new Date();
        if (typeof input === 'string') {
            const parsed = new Date(input);
            if (!isNaN(parsed)) return parsed;
            const parts = input.split('.');
            return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        }
        return new Date(input);
    };

    const [arrivaldate, setArrivaldate] = useState(animal ? smartDateparserzoo(animal.arrivaldate) : new Date());
    const [date, setDate] = useState(animal ? smartDateparserzoo(animal.date) : new Date());

    const uploadanimalimage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.7,
            includeBase64: false
        });

        if (result.didCancel) return;
        if (result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        } else {
            Alert.alert('Ooops', 'Failed to select an image.');
        }
    };
    
    const formatDate = (dateObj) => {
        const dd = String(dateObj.getDate()).padStart(2, '0');
        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
        const yyyy = dateObj.getFullYear();
        return `${dd}.${mm}.${yyyy}`;
    };
    
    const saveAnimalentry = async () => {
        if (!image || !animall || !category || !name || !cage || !ration || !healthcard || !type || !description) {
            Alert.alert('Missing information', 'Please fill in all required fields.');
            return;
        }
        
        try {
            const stored = await AsyncStorage.getItem('ANIMALS');
            const animals = stored ? JSON.parse(stored) : [];

            const newAnimal = {
                id: animal?.id || Date.now().toString(),
                image,
                animall,
                category,
                name,
                cage,
                ration,
                healthcard,
                rarespecies,
                type,
                description,
                arrivaldate: formatDate(arrivaldate),
                date: formatDate(date)
            };

            let updated;
            if (animal) {
                updated = animals.map(a => a.id === animal.id ? newAnimal : a);
            } else {
                updated = [...animals, newAnimal];
            }

            await AsyncStorage.setItem('ANIMALS', JSON.stringify(updated));
            navigation.navigate('Smarthomezoo');
        } catch (e) {
            Alert.alert('Error', 'Could not save the entry.');
            console.log('Save error:', e);
        }
    };

    return (
        <View style={zoo.container}>

            <TouchableOpacity
                onPress={() => step > 0 ? setStep(step - 1) : navigation.goBack()}
            >
                <Image source={backbutton} style={zoo.backImage} />
            </TouchableOpacity>

            <Text style={zoo.mainTitle}>{animal ? 'Edit animal' : 'Add animal'}</Text>

            {
                step === 0 && (
                    <ScrollView style={{ width: '100%' }}>
                        
                        <TouchableOpacity
                            style={form.imgButton}
                            onPress={uploadanimalimage}
                        >
                            <Image
                                source={image ? { uri: image } : holder}
                                style={[ image ? form.animalImg : form.imgIcon]}
                            />
                        </TouchableOpacity>

                        <Text style={form.label}>Arrival date</Text>
                        <DateTimePicker 
                            value={arrivaldate} 
                            mode="date" 
                            display="spinner" 
                            themeVariant="dark"
                            onChange={(event, selectedDate) => selectedDate && setArrivaldate(selectedDate)}
                            style={{alignSelf: 'center', maxWidth: 280 }}
                        />

                        {[
                            { label: 'Animal', value: animall, setter: setAnimall },
                            { label: 'Name', value: name, setter: setName },
                            { label: 'Cage', value: cage, setter: setCage },
                        ].map((field, idx) => (
                            <View key={idx}>
                                <Text style={form.label}>{field.label}</Text>
                                <View style={{ width: '100%' }}>
                                    <TextInput
                                        style={form.input}
                                        value={field.value}
                                        onChangeText={field.setter}
                                        placeholder='Enter text ...'
                                        placeholderTextColor='#837464'
                                    />
                                    {field.value && (
                                        <TouchableOpacity style={form.clearButton} onPress={() => field.setter('')}>
                                            <Image source={clear} style={form.clearIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        ))}

                        <Text style={form.label}>Category</Text>
                        <View style={[zoo.row, {justifyContent: 'flex-start', flexWrap: 'wrap'}]}>
                            {
                                ['🐘 Mammals', '🐦 Birds', '🦎 Reptiles', '🐞 Insects'].map((cat, j) => (
                                    <TouchableOpacity
                                        key={j}
                                        style={[form.categoryButton, category === cat && { backgroundColor: '#837464' }]}
                                        onPress={() => setCategory(cat)}
                                    >
                                        <Text style={[form.categoryButtonText, category === cat && {fontWeight: '800'}]}>{cat}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                        <View style={{height: 10}} />

                        {[
                            { label: 'Ration', value: ration, setter: setRation },
                            { label: 'Health card', value: healthcard, setter: setHealthcard }
                        ].map((field, idx) => (
                            <View key={idx}>
                                <Text style={form.label}>{field.label}</Text>
                                <TextInput
                                    style={[form.input, { minHeight: 122 }]}
                                    value={field.value}
                                    onChangeText={field.setter}
                                    placeholder='Enter text ...'
                                    placeholderTextColor='#837464'
                                    multiline
                                />
                                {field.value && (
                                    <TouchableOpacity style={form.clearButton} onPress={() => field.setter('')}>
                                        <Image source={clear} style={form.clearIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}

                        <View style={zoo.row}>
                            <TouchableOpacity
                                style={form.checkedButton}
                                onPress={() => setRarespecies(true)}
                            >
                                {
                                    rarespecies && (
                                        <Image source={checked} style={form.checkedIcon} />
                                    )
                                }
                            </TouchableOpacity>
                            <Text style={form.categoryButtonText}>Rare species</Text>
                        </View>

                        <View style={{height: 100}} />
                    </ScrollView>
                )
            }

            {
                step === 1 && (
                    <View style={{width: '100%', flexGrow: 1}}>
                        {
                            ['Examination', 'Vaccination', 'Feed change'].map((t, k) => (
                                <TouchableOpacity
                                    key={k}
                                    style={[form.typeButton, type === t && {backgroundColor: '#837464'}]}
                                    onPress={() => setType(t)}
                                >
                                    <Text style={[form.typeButtonText, type === t && {fontWeight: '800'}]}>{t}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                )
            }

            {
                step === 2 && (
                    <View style={{ width: '100%', flexGrow: 1 }}>
                        
                        <Text style={form.label}>Date</Text>
                        <DateTimePicker 
                            value={date} 
                            mode="date" 
                            display="spinner" 
                            themeVariant="dark"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) setDate(selectedDate);
                            }} 
                            style={{alignSelf: 'center', maxWidth: 280 }}
                        />

                        <Text style={form.label}>Description</Text>
                        <View style={{ width: '100%' }}>
                            <TextInput
                                style={[form.input, {minHeight: 122}]}
                                value={description}
                                onChangeText={setDescription}
                                placeholder='Enter text ...'
                                placeholderTextColor='#837464'
                                multiline
                            />
                            {
                                description && (
                                    <TouchableOpacity
                                        style={form.clearButton}
                                        onPress={() => setDescription(null)}
                                    >
                                        <Image source={clear} style={form.clearIcon} />
                                    </TouchableOpacity>
                                )
                            }
                        </View>

                    </View>
                )
            }

            <TouchableOpacity
                style={[zoo.button, {bottom: 50}]}
                onPress={() => step < 2 ? setStep(step + 1) : saveAnimalentry()}
            >
                <Text style={zoo.buttonText}>Done</Text>
            </TouchableOpacity>
            
        </View>
    )
};

export default Smartaddanimal;