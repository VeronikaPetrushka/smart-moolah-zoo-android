import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zoo, card } from '../smartconstszoo/smartstyles';
import { historybutton, nothingadded } from '../smartimprtszoo/smartimgszoo';
import { Calendar } from 'react-native-calendars';
import { format, parse } from 'date-fns';

const { height } = Dimensions.get('window');

const Smartplanzoo = () => {
    const navigation = useNavigation();
    const [planzoo, setPlanzoo] = useState([]);
    const [marked, setMarked] = useState({});

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
        const convertDate = (ddmmyyyy) => {
            const [dd, mm, yyyy] = ddmmyyyy.split('.');
            return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
        };

        const markedObj = {};

        planzoo.forEach(plan => {
            const isoDate = convertDate(plan.date);
            markedObj[isoDate] = { marked: true };
        });

        setMarked(markedObj);
    }, [planzoo]);

    console.log(marked)
    
    return (
        <View style={zoo.container}>

            <Text style={zoo.mainTitle}>Plan</Text>

            <TouchableOpacity
                style={{ position: 'absolute', top: height * 0.08, right: 20, zIndex: 10 }}
                onPress={() => navigation.navigate('Smarthistoryzoo')}
            >
                <Image source={historybutton} style={{width: 42, height: 42, resizeMode: 'contain'}} />
            </TouchableOpacity>

            {
                planzoo.length > 0 ? (
                    <ScrollView style={{ width: '100%' }}>
                        {
                            // Today's plans
                            (() => {
                                const today = format(new Date(), 'dd.MM.yyyy');
                                const todayPlans = planzoo.filter(p => p.date === today);
                                return todayPlans.length > 0 && (
                                    <>
                                        <Text style={[zoo.subtitle, {fontSize: 18}]}>Today's plan</Text>
                                        {todayPlans.map((plan, i) => (
                                            <TouchableOpacity
                                                key={`today-${i}`}
                                                style={card.container}
                                                onPress={() => navigation.navigate('Smartplaninfo', { plan })}
                                            >
                                                <View style={[zoo.row, { justifyContent: 'space-between', alignItems: 'center'  }]}>
                                                    <Text style={card.name}>{plan.type}</Text>
                                                    <View style={card.categoryContainer}>
                                                        <Text style={card.categoryText}>{plan.category}</Text>
                                                    </View>
                                                </View>
                                                <Text style={card.date}>{plan.selectedAnimal.name}</Text>
                                                <Text style={card.date}>{plan.time}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </>
                                );
                            })()
                        }

                        <Calendar
                            style={{ marginBottom: 10, backgroundColor: 'transparent' }}
                            onDayPress={(day) => setSelectedDate(day.dateString)}
                            markingType={'multi-dot'}
                            markedDates={marked}
                            renderArrow={(direction) => (
                                <Text style={{ color: '#FEFE65', fontSize: 22 }}>{direction === 'left' ? '<' : '>'}</Text>
                            )}
                            theme={{
                                backgroundColor: 'transparent',
                                calendarBackground: 'transparent',
                                textSectionTitleColor: 'rgba(255,255,255,0.5)',
                                todayTextColor: '#FFF',
                                dayTextColor: '#FFF',
                                textDisabledColor: 'rgba(255,255,255,0.2)',
                                arrowColor: '#FEFE65',
                                monthTextColor: '#FEFE65',
                                textMonthFontSize: 25,
                                textMonthFontWeight: '800',
                                textDayFontWeight: '600',
                                textDayFontSize: 16,
                                dotColor: 'red',
                                dotSize: 8,
                            }}
                            
                            dayComponent={({ date, state }) => {
                                const isToday = date.dateString === format(new Date(), 'yyyy-MM-dd');
                                const hasEvents = marked[date.dateString]?.marked;

                                return (
                                    <View
                                        onPress={() => setSelectedDate(date.dateString)}
                                        style={{
                                            backgroundColor: isToday ? '#837464' : '#524639',
                                            borderRadius: 15,
                                            paddingVertical: 8,
                                            margin: 2,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 44,
                                            height: 44
                                        }}
                                    >
                                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{date.day}</Text>
                                        {hasEvents && (
                                            <View style={{
                                                position: 'absolute',
                                                bottom: 6,
                                                right: 6,
                                                width: 6,
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor: 'red'
                                            }}/>
                                        )}
                                    </View>
                                );
                            }}
                        />

                        {
                            // Group by other dates (sorted in descending order)
                            (() => {
                                const today = format(new Date(), 'dd.MM.yyyy');
                                const grouped = {};

                                planzoo.forEach(p => {
                                    if (p.date !== today) {
                                        if (!grouped[p.date]) grouped[p.date] = [];
                                        grouped[p.date].push(p);
                                    }
                                });

                                const sortedEntries = Object.entries(grouped).sort(([dateA], [dateB]) => {
                                    const parsedDateA = parse(dateA, 'dd.MM.yyyy', new Date());
                                    const parsedDateB = parse(dateB, 'dd.MM.yyyy', new Date());
                                    return parsedDateB - parsedDateA;
                                });

                                return sortedEntries.map(([date, items]) => (
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
                                ));
                            })()
                        }
                        
                        <View style={{height: 400}} />
                    </ScrollView>
                ) : (
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <Image source={nothingadded} style={zoo.nothingImg} />
                            <Text style={zoo.nothingText}>You don't have anything here yet</Text>
                        </View>
                )
            }                    

            <View style={{width: '100%', position: 'absolute', bottom: 120, alignSelf: 'center'}}>
                <TouchableOpacity
                    style={[zoo.button, {marginBottom: 7}]}
                    onPress={() => navigation.navigate('Smartaddplan')}
                >
                    <Text style={zoo.buttonText}>Add plan</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
};

export default Smartplanzoo;