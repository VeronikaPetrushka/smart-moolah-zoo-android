import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zoo, card } from '../smartconstszoo/smartstyles';
import { backbutton, nothingadded } from '../smartimprtszoo/smartimgszoo';
import { format, parse, isBefore, startOfToday } from 'date-fns';

const Smartplanzoo = () => {
    const navigation = useNavigation();
    const [planzoo, setPlanzoo] = useState([]);
    const [groupedPastPlans, setGroupedPastPlans] = useState({});

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const storedPlanszoo = await AsyncStorage.getItem('PLANS_ZOO');
                    const parsed = storedPlanszoo ? JSON.parse(storedPlanszoo) : [];
                    setPlanzoo(parsed);
                } catch (error) {
                    console.log('Error loading data:', error);
                }
            };
            fetchData();
        }, [])
    );

    useEffect(() => {
        const today = startOfToday();
        const filtered = planzoo.filter(plan => {
            if (!plan.date) return false;
            const planDate = parse(plan.date, 'dd.MM.yyyy', new Date());
            return isBefore(planDate, today);
        });

        // Group by date
        const grouped = {};
        filtered.forEach(p => {
            if (!grouped[p.date]) grouped[p.date] = [];
            grouped[p.date].push(p);
        });

        // Sort dates in descending order
        const sortedEntries = Object.entries(grouped).sort(([dateA], [dateB]) => {
            const parsedDateA = parse(dateA, 'dd.MM.yyyy', new Date());
            const parsedDateB = parse(dateB, 'dd.MM.yyyy', new Date());
            return parsedDateB - parsedDateA;
        });

        setGroupedPastPlans(sortedEntries);
    }, [planzoo]);

    return (
        <View style={zoo.container}>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={backbutton} style={zoo.backImage} />
            </TouchableOpacity>

            <Text style={zoo.mainTitle}>History</Text>

            {groupedPastPlans.length > 0 ? (

                <ScrollView style={{ width: '100%' }}>

                    {groupedPastPlans.map(([date, items]) => (

                        <View key={date}>

                            <Text style={[zoo.subtitle, { fontSize: 18, marginTop: 24 }]}>
                                {format(parse(date, 'dd.MM.yyyy', new Date()), 'd MMMM')}
                            </Text>

                            {items.map((plan, i) => (
                                <TouchableOpacity
                                    key={`${date}-${i}`}
                                    style={card.container}
                                    onPress={() => navigation.navigate('Smartplaninfo', { plan })}
                                >
                                    <View style={[zoo.row, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                        <Text style={card.name}>{plan.type}</Text>
                                        <View style={card.categoryContainer}>
                                            <Text style={card.categoryText}>{plan.category}</Text>
                                        </View>
                                    </View>
                                    <Text style={card.date}>{plan.selectedAnimal.name}</Text>
                                    <Text style={card.date}>{plan.time}</Text>
                                </TouchableOpacity>
                            ))}

                        </View>

                    ))}

                    <View style={{height: 400}} />
                </ScrollView>
            ) : (
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Image source={nothingadded} style={zoo.nothingImg} />
                        <Text style={zoo.nothingText}>You don't have any past plans yet</Text>
                    </View>
            )}
        </View>
    )
};

export default Smartplanzoo;