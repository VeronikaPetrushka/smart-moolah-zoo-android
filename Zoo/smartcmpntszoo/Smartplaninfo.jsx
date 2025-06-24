import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zoo, form, card, info } from '../smartconstszoo/smartstyles';
import { deletebutton, editbutton, setarow } from '../smartimprtszoo/smartimgszoo';

const Smartplaninfo = ({ plan }) => {
    const navigation = useNavigation();

    const handleEdititem = () => {
        navigation.navigate('Smartaddplan', { plan })
    };

    const handleDeleteitem = async () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this plan?',
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
                            const key = 'PLANS_ZOO';
                            const stored = await AsyncStorage.getItem(key);
                            const data = stored ? JSON.parse(stored) : [];
                            const filtered = data.filter(obj => obj.id !== plan.id);
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
        <View style={[zoo.container, {paddingTop: 120}]}>

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

            <ScrollView style={{ width: '100%', paddingTop: 30 }}>

                <View style={[form.categoryButton, {width: 110, alignItems: 'center', justifyContent: 'center', marginBottom: 12, alignSelf: 'flex-end'}]}>
                    <Text style={form.categoryButtonText}>{plan.category}</Text>
                </View>
                
                <Text style={zoo.mainTitle}>{plan.type}</Text>

                <View style={[zoo.row, {justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}]}>
                    <Text style={[form.label, { marginBottom: 0 }]}>Date</Text>
                    <Text style={info.value}>{plan.date}</Text>
                </View>

                <View style={[zoo.row, {justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}]}>
                    <Text style={[form.label, { marginBottom: 0 }]}>Time</Text>
                    <Text style={info.value}>{plan.time}</Text>
                </View>

                <View style={[zoo.row, {justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}]}>
                    <Text style={[form.label, { marginBottom: 0 }]}>Frequency</Text>
                    <Text style={info.value}>{plan.frequency}</Text>
                </View>

                <Text style={[form.categoryButtonText, {fontSize: 16, lineHeight: 20, marginBottom: 5 }]}>Animal</Text>
                
                <TouchableOpacity
                    style={card.container}
                    onPress={() => navigation.navigate('Smartanimalinfo', { item: plan.selectedAnimal, type: 'animal' })}
                >
                    <View style={[card.categoryContainer, {width: 110, alignItems: 'center', justifyContent: 'center', marginBottom: 7}]}>
                        <Text style={card.categoryText}>{plan.selectedAnimal.category}</Text>
                    </View>
                    <Text style={[card.name, { marginBottom: 2}]}>{plan.selectedAnimal.name}</Text>
                    <Text style={card.date}>{plan.selectedAnimal.arrivaldate}</Text>
                </TouchableOpacity>

                <View style={{height: 100}} />
            </ScrollView>
            
        </View>
    )
};

export default Smartplaninfo;