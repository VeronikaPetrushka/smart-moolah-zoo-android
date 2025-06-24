import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zoo, form, card, info } from '../smartconstszoo/smartstyles';
import { deletebutton, editbutton, lion, setarow } from '../smartimprtszoo/smartimgszoo';

const Smartanimalinfo = ({ item, type }) => {
    const navigation = useNavigation();

    const handleEdititem = () => {
        if (type === 'animal') {
            navigation.navigate('Smartaddanimal', { animal: item })
        } else {
            navigation.navigate('Smartaddenclosure', { enclosure: item })
        }
    };

    const handleDeleteitem = () => {
        Alert.alert(
            'Confirm Deletion',
            `Are you sure you want to delete this ${type === 'animal' ? 'animal' : 'enclosure'}?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Yes, Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const key = type === 'animal' ? 'ANIMALS' : 'ENCLOSURES';
                            const stored = await AsyncStorage.getItem(key);
                            const data = stored ? JSON.parse(stored) : [];

                            const filtered = data.filter(obj => obj.id !== item.id);
                            await AsyncStorage.setItem(key, JSON.stringify(filtered));

                            navigation.goBack();
                        } catch (e) {
                            Alert.alert('Error', 'Could not delete the item.');
                            console.log('Delete error:', e);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={[zoo.container, {paddingTop: 100}]}>

            <View style={zoo.upperContainer}>
                <TouchableOpacity
                    style={[zoo.row, {width: 'content', alignItems: 'center'}]}
                    onPress={() => navigation.goBack()}
                    >
                    <Image
                        source={setarow}
                        style={[
                            zoo.arrow,
                            {
                                transform: [{ rotate: '180deg' }]
                            }
                        ]}
                    />
                    <Text style={zoo.backText}>Back</Text>
                </TouchableOpacity>

                <View style={[zoo.row, {width: 'content'}]}>
                    <TouchableOpacity
                        style={{marginRight: 10}}
                        onPress={handleEdititem}
                    >
                        <Image
                            source={editbutton}
                            style={zoo.actionButton}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDeleteitem}>
                        <Image
                            source={deletebutton}
                            style={zoo.actionButton}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <Image source={lion} style={[zoo.lion, { width: 230, marginBottom: 0, position: 'static' }]} />
            
            {
                type === 'animal' && (
                    <View style={[zoo.textContainer, {top: 300, right: 30, bottom: 'none', width: '65%'}]}>
                        <Text style={[zoo.text, {fontSize: 11, lineHeight: 19}]}>{`It's time for the ${item.animall} to have a procedure! He doesn't like it, but we know how to talk him into it`}</Text>
                    </View>
                )
            }

            {
                type === 'animal' && (
                    <ScrollView style={{ width: '100%' }}>
                        
                        <Text style={zoo.mainTitle}>{item.name}</Text>

                        <Image source={{uri: item.image}} style={info.image} />
                        
                        {
                            item.rarespecies && (
                                <View style={[form.categoryButton, {width: 110, alignItems: 'center', justifyContent: 'center', marginBottom: 12}]}>
                                    <Text style={form.categoryButtonText}>Rare species</Text>
                                </View>
                            )
                        }

                        <View style={[zoo.row, {justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}]}>
                            <Text style={[form.label, { marginBottom: 0 }]}>Arrival date</Text>
                            <Text style={info.value}>{item.arrivaldate}</Text>
                        </View>

                        <View style={[zoo.row, {justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}]}>
                            <Text style={[form.label, { marginBottom: 0 }]}>Animal</Text>
                            <Text style={info.value}>{item.animall}</Text>
                        </View>

                        <View style={[zoo.row, {justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}]}>
                            <Text style={[form.label, { marginBottom: 0 }]}>Cage</Text>
                            <Text style={info.value}>{item.cage}</Text>
                        </View>

                        <Text style={form.label}>Ration</Text>
                        <Text style={[info.value, {marginBottom: 12}]}>{item.ration}</Text>

                        <Text style={form.label}>Health card</Text>
                        <Text style={[info.value, { marginBottom: 12 }]}>{item.healthcard}</Text>
                        
                        <View style={card.container}>
                            <Text style={[info.value, {marginBottom: 2}]}>{item.type}</Text>
                            <Text style={card.date}>{item.description}</Text>
                            <Text style={card.date}>{item.date}</Text>
                        </View>

                        <View style={{height: 100}} />
                    </ScrollView>
                )
            }

            {
                type === 'enclosure' && (
                    <ScrollView style={{ width: '100%' }}>
                        
                        <Text style={zoo.mainTitle}>{item.cage}</Text>
                        
                        <View style={[form.categoryButton, {width: 160, alignItems: 'center', justifyContent: 'center', marginBottom: 12}]}>
                            <Text style={form.categoryButtonText}>{item.status}</Text>
                        </View>

                        <View style={{height: 100}} />
                    </ScrollView>
                )
            }
            
        </View>
    )
};

export default Smartanimalinfo;