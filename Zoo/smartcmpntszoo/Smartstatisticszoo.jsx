import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { zoo, form, card } from '../smartconstszoo/smartstyles';
import { lion, nothingadded } from '../smartimprtszoo/smartimgszoo';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { format } from 'date-fns';

const Smartstatisticszoo = () => {
    const navigation = useNavigation();
    const [animals, setAnimals] = useState([]);
    const [feed, setFeed] = useState([]);
    const [visitors, setVisitors] = useState([]);
    const [mostFrequentCategory, setMostFrequentCategory] = useState('');
    const [rareSpeciesCount, setRareSpeciesCount] = useState(0);
    const [totalFeedExpenses, setTotalFeedExpenses] = useState(0);
    const [activityRating, setActivityRating] = useState((Math.random() * 2 + 3).toFixed(1));

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const storedAnimals = await AsyncStorage.getItem('ANIMALS');
                    const storedFeed = await AsyncStorage.getItem('FEED_ZOO');
                    const storedVisitors = await AsyncStorage.getItem('VISITORS_ZOO');

                    const parsedAnimals = storedAnimals ? JSON.parse(storedAnimals) : [];
                    const parsedFeed = storedFeed ? JSON.parse(storedFeed) : [];
                    const parsedVisitors = storedVisitors ? JSON.parse(storedVisitors) : [];

                    setAnimals(parsedAnimals);
                    setFeed(parsedFeed);
                    setVisitors(parsedVisitors);

                    // Most frequent category
                    const categoryCount = {};
                    parsedAnimals.forEach(animal => {
                        categoryCount[animal.category] = (categoryCount[animal.category] || 0) + 1;
                    });
                    const mostFrequent = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
                    setMostFrequentCategory(mostFrequent);

                    // Rare species count
                    const rareCount = parsedAnimals.filter(a => a.rarespecies === true).length;
                    setRareSpeciesCount(rareCount);

                    // Total feed expenses
                    const totalExpenses = parsedFeed.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
                    setTotalFeedExpenses(totalExpenses);
                } catch (error) {
                    console.error('Error loading data:', error);
                    Alert.alert('Error', 'Failed to load statistics data.');
                }
            };

            fetchData();
        }, [])
    );

    const exportZoostatistics = async () => {
        try {
            const statsData = {
                date: format(new Date(), 'MMMM yyyy'),
                totalAnimals: animals.length,
                mostFrequentCategory,
                rareSpeciesCount,
                totalFeedExpenses,
                totalVisitors: visitors.length,
                activityRating,
                feedItems: feed.length,
            };

            const html = `
                <h1 style="text-align: center; color: #333;">Zoo Statistics Report</h1>
                <h2 style="color: #555;">${statsData.date}</h2>
                
                <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">Animal Statistics</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Total Animals</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${statsData.totalAnimals}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Most Frequent Category</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${statsData.mostFrequentCategory}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Rare Species Count</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${statsData.rareSpeciesCount}</td>
                    </tr>
                </table>
                
                <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">Feed Statistics</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Total Feed Expenses</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${statsData.totalFeedExpenses.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Number of Feed Items</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${statsData.feedItems}</td>
                    </tr>
                </table>
                
                <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">Visitor Statistics</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Total Visitors</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${statsData.totalVisitors}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">Activity Rating</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${statsData.activityRating}/5</td>
                    </tr>
                </table>
                
                <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">Feed Items</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Name</th>
                            <th style="padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Quantity</th>
                            <th style="padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${feed.map(item => `
                            <tr>
                                <td style="padding: 8px; border: 1px solid #ddd;">${item.feedName || 'N/A'}</td>
                                <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${item.quantity || 0} kg</td>
                                <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${item.price || 0}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;

            // PDF options
            const options = {
                html,
                fileName: `Zoo_Statistics_Report_${format(new Date(), 'yyyy-MM-dd')}`,
                directory: 'Documents',
            };

            // Generate PDF
            const pdf = await RNHTMLtoPDF.convert(options);

            // Share the PDF
            await Share.open({
                url: `file://${pdf.filePath}`,
                type: 'application/pdf',
                title: 'Share Zoo Statistics Report',
                failOnCancel: false,
            });

        } catch (error) {
            console.error('Export error:', error);
            Alert.alert('Error', 'Failed to export statistics report');
        }
    };
    
    return (
        <View style={zoo.container}>

            <Text style={zoo.mainTitle}>Statistics</Text>

            {
                (feed.length === 0 && visitors.length === 0 && animals.length === 0) && (
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Image source={nothingadded} style={zoo.nothingImg} />
                        <Text style={zoo.nothingText}>You don't have anything here yet</Text>
                    </View>
                )
            }

            {
                (feed.length > 0 || visitors.length > 0 || animals.length > 0) && (
                    <ScrollView style={{ width: '100%' }}>

                        <Image source={lion} style={[zoo.lion, { position: 'static', width: 230, height: 220 }]} />
                        
                        {
                            animals.length > 0 ? (
                                <>
                                    <Text style={form.label}>Category</Text>
                                    <View style={[zoo.row, {justifyContent: 'flex-start', flexWrap: 'wrap'}]}>
                                        {
                                            ['🐘 Mammals', '🐦 Birds', '🦎 Reptiles', '🐞 Insects'].map((cat, j) => (
                                                <View
                                                    key={j}
                                                    style={[form.categoryButton, mostFrequentCategory === cat && { backgroundColor: '#837464' }]}
                                                >
                                                    <Text style={[form.categoryButtonText, mostFrequentCategory === cat && {fontWeight: '800'}]}>{cat}</Text>
                                                </View>
                                            ))
                                        }
                                    </View>
                                    
                                    <View style={{ height: 20 }} />

                                    <View style={[card.container, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                                        <View style={{alignItems: 'center'}}>
                                            <Text style={card.date}>Total number</Text>
                                            <Text style={card.name}>{animals.length}</Text>
                                        </View>
                                        <View style={{alignItems: 'center'}}>
                                            <Text style={card.date}>New arrivals</Text>
                                            <Text style={card.name}>{animals.length}</Text>
                                        </View>
                                        <View style={{alignItems: 'center'}}>
                                            <Text style={card.date}>Rare species</Text>
                                            <Text style={card.name}>{rareSpeciesCount}</Text>
                                        </View>
                                    </View>

                                    <View style={{ height: 20 }} />
                                </>
                            ) : (
                                    <View style={{width: '100%', alignItems: 'center'}}>
                                        <Image source={nothingadded} style={zoo.nothingImg} />
                                        <Text style={zoo.nothingText}>You don't have anything here yet</Text>
                                    </View>
                            )
                        }
                        
                        <Text style={zoo.subtitle}>Feed</Text>
                        {
                            feed.length > 0 ? (
                                <View style={{ width: '100%' }}>

                                    <View style={[card.container, {paddingVertical: 20, marginBottom: 10}]}>
                                        <Text style={[card.date, {marginBottom: 12}]}>Expenses</Text>
                                        <Text style={card.name}>{totalFeedExpenses} $</Text>
                                    </View>

                                    {
                                        feed.map((item, k) => (
                                            <TouchableOpacity
                                                key={k}
                                                style={card.container}
                                                onPress={() => navigation.navigate('Smartfeedinfo', { feed: item })}
                                            >
                                                <View style={[zoo.row, {justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}]}>
                                                    <Text style={card.name}>{item.feedName}</Text>
                                                    <Text style={card.date}>{item.quantity} kg</Text>
                                                </View>
                                                <Text style={card.name}>{item.price} $</Text>
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

                        <TouchableOpacity
                            style={[zoo.button, {marginBottom: 10, marginTop: 40}]}
                            onPress={() => navigation.navigate('Smartaddfeed')}
                        >
                            <Text style={zoo.buttonText}>Add feed</Text>
                        </TouchableOpacity>

                        <Text style={[zoo.subtitle, {marginTop: 20}]}>Number of visitors and tickets</Text>
                        {
                            visitors.length > 0 ? (
                                <View style={{ width: '100%' }}>
                                    
                                    <View style={[card.container, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                                        <View style={{alignItems: 'center'}}>
                                            <Text style={card.date}>Visitors</Text>
                                            <Text style={card.name}>{visitors.length}</Text>
                                        </View>
                                        <View style={{alignItems: 'center'}}>
                                            <Text style={card.date}>Tickets sold</Text>
                                            <Text style={card.name}>{visitors.length}</Text>
                                        </View>
                                        <View style={{alignItems: 'center'}}>
                                            <Text style={card.date}>Activity ratins</Text>
                                            <Text style={card.name}>{activityRating}</Text>
                                        </View>
                                    </View>

                                </View>
                            ) : (
                                    <View style={{width: '100%', alignItems: 'center'}}>
                                        <Image source={nothingadded} style={zoo.nothingImg} />
                                        <Text style={zoo.nothingText}>You don't have anything here yet</Text>
                                    </View>
                            )
                        }

                        <TouchableOpacity
                            style={[zoo.button, {marginTop: 40}]}
                            onPress={() => navigation.navigate('Smartaddvisitors')}
                        >
                            <Text style={zoo.buttonText}>Add visitors</Text>
                        </TouchableOpacity>

                        <View style={{height: 200}} />
                    </ScrollView>
                )
            }

            {
                (feed.length === 0 && visitors.length === 0 && animals.length === 0) && (
                    <View style={{ width: '100%', alignSelf: 'center', position: 'absolute', bottom: 120 }}>
                        <TouchableOpacity
                            style={zoo.button}
                            onPress={() => navigation.navigate('Smartaddfeed')}
                        >
                            <Text style={zoo.buttonText}>Add feed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[zoo.button, {marginTop: 10, backgroundColor: '#fff'}]}
                            onPress={() => navigation.navigate('Smartaddvisitors')}
                        >
                            <Text style={[zoo.buttonText, {color: '#000'}]}>Add visitors</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

            {
                (animals.length > 0 && feed.length > 0 && visitors.length > 0) && (
                    <TouchableOpacity
                        style={[zoo.button, {position: 'absolute', bottom: 120, backgroundColor: '#0900FFFC', alignSelf: 'center'}]}
                        onPress={exportZoostatistics}
                    >
                        <Text style={[zoo.buttonText, {color: '#fff'}]}>Exports</Text>
                    </TouchableOpacity>
                )
            }
            
        </View>
    )
};

export default Smartstatisticszoo;