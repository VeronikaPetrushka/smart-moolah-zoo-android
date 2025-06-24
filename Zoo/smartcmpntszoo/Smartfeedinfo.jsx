import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zoo, form, card, info } from '../smartconstszoo/smartstyles';
import { deletebutton, editbutton, setarow } from '../smartimprtszoo/smartimgszoo';

const Smartfeedinfo = ({ feed }) => {
    const navigation = useNavigation();

    const handleEdititem = () => {
        navigation.navigate('Smartaddfeed', { feed })
    };

    const handleDeleteitem = async () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this feed?',
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
                            const key = 'FEED_ZOO';
                            const stored = await AsyncStorage.getItem(key);
                            const data = stored ? JSON.parse(stored) : [];
                            const filtered = data.filter(obj => obj.id !== feed.id);
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
                <Text style={zoo.mainTitle}>{feed.feedName}</Text>

                <View style={[zoo.row, {justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}]}>
                    <Text style={[form.label, { marginBottom: 0 }]}>Quantity (kg)</Text>
                    <Text style={info.value}>{feed.quantity}</Text>
                </View>

                <View style={[zoo.row, {justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}]}>
                    <Text style={[form.label, { marginBottom: 0 }]}>Price ($)</Text>
                    <Text style={info.value}>{feed.price}</Text>
                </View>

                <Text style={[form.categoryButtonText, {fontSize: 16, lineHeight: 20, marginBottom: 5 }]}>Animal</Text>
                    
                <TouchableOpacity
                    style={card.container}
                    onPress={() => navigation.navigate('Smartanimalinfo', { item: feed.selectedAnimal, type: 'animal' })}
                >
                    <View style={[card.categoryContainer, {width: 110, alignItems: 'center', justifyContent: 'center', marginBottom: 7}]}>
                        <Text style={card.categoryText}>{feed.selectedAnimal.category}</Text>
                    </View>
                    <Text style={[card.name, { marginBottom: 2}]}>{feed.selectedAnimal.name}</Text>
                    <Text style={card.date}>{feed.selectedAnimal.arrivaldate}</Text>
                </TouchableOpacity>
                <View style={{height: 100}} />
            </ScrollView>
            
        </View>
    )
};

export default Smartfeedinfo;