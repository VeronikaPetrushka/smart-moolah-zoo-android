import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { zoo, background, test } from '../smartconstszoo/smartstyles';
import smarttestzoo from '../smartconstszoo/smarttestzoo';
import { lion, testCloseButton, testRetryButton } from '../smartimprtszoo/smartimgszoo';
import Moolahnavgt from '../smartzooshare/Moolahnavgt';

const { height } = Dimensions.get('window');

const Smarttestzoo = () => {
    const [teststarted, setTeststarted] = useState(false);
    const [testfinished, setTestfinished] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

    const nextQuestion = () => {
        const currentQuestion = smarttestzoo[questionIndex];
        
        if (selectedOption === currentQuestion.correctAnswer) {
            setCorrectAnswersCount(prev => prev + 1);
        }

        if (questionIndex + 1 === smarttestzoo.length) {
            setTestfinished(true);
            setTeststarted(false);
        } else {
            setQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
        }
    };

    return (
        <View style={zoo.container}>

            {
                (!teststarted && !testfinished)&& (
                    <View style={{width: '100%', flexGrow: 1}}>
                        <Text style={[
                            zoo.mainTitle,
                            { textAlign: 'center', alignSelf: 'center', marginBottom: 30, marginTop: height > 700 ? 70 : 0, fontSize: 38, width: height > 700 ? '85%' : '100%' }
                        ]}>
                            The zoo through the eyes of the director
                        </Text>

                        <Image source={lion} style={[zoo.lion, { bottom: 170 }]} />               
                    </View>
                )
            }

            {
                (!teststarted && !testfinished)&& (
                    <TouchableOpacity
                        style={[zoo.button, { bottom: 120 }]}
                        onPress={() => setTeststarted(true)}
                    >
                        <Text style={zoo.buttonText}>Play</Text>
                    </TouchableOpacity>
                )
            }

            {
                (!teststarted && !testfinished)&& (
                    <View style={background.navigation}>
                        <Moolahnavgt />
                    </View>
                )
            }

            {
                (teststarted && !testfinished) && (
                    <View style={{ width: '100%', flexGrow: 1 }}>
                        
                        <View style={[zoo.row, {justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}]}>
                            <Text style={[zoo.mainTitle, { marginBottom: 0, fontWeight: '900' }]}>{questionIndex + 1}/{smarttestzoo.length}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setTeststarted(false);
                                    setSelectedOption(null);
                                    setQuestionIndex(0);
                                    setCorrectAnswersCount(0);
                                    setTestfinished(false);
                                }}
                            >
                                <Image source={testCloseButton} style={{width: 42, height: 42, resizeMode: 'contain'}} />
                            </TouchableOpacity>
                        </View>

                        {
                            smarttestzoo[questionIndex].type === 'photo' ? (
                                <Image source={smarttestzoo[questionIndex].image} style={[test.image, {height: height > 700 ? 215 : height * 0.2}]} />
                            ) : (
                                    <Image source={lion} style={[zoo.lion, {width: 230, height: height > 700 ? 220 : height * 0.18, marginBottom: 0, position: 'static'}]} />
                            )
                        }

                        <Text style={[zoo.mainTitle, { fontSize: 25, lineHeight: 28, marginTop: height > 700 ? 24 : 0, marginBottom: height > 700 ? 24 : 5 }]}>
                            {smarttestzoo[questionIndex].question}
                        </Text>

                        <ScrollView style={{ width: '100%', height: 300 }}>
                            
                            {
                                smarttestzoo[questionIndex].options.map((opt, k) => (
                                    <TouchableOpacity
                                        key={k}
                                        style={[test.button, selectedOption === opt && {borderWidth: 1, borderColor: '#AC8D4C'}]}
                                        onPress={() => selectedOption === opt
                                            ? setSelectedOption(null)
                                            : setSelectedOption(opt)
                                        }
                                    >
                                        <View style={test.letterBox}>
                                            <Text style={test.letter}>{String.fromCharCode(65 + k)}</Text>
                                        </View>
                                        <Text style={test.buttonText}>{opt}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                            
                            <View style={{height: 200}} />
                        </ScrollView>

                    </View>
                )
            }

            {
                (teststarted && !testfinished) && (
                    <TouchableOpacity
                        style={[zoo.button, { bottom: 40 }, !selectedOption && {opacity: 0.5}]}
                        onPress={nextQuestion}
                        disabled={!selectedOption}
                    >
                        <Text style={zoo.buttonText}>Choose</Text>
                    </TouchableOpacity>
                )
            }

            {
                (!teststarted && testfinished)&& (
                    <View style={{width: '100%', flexGrow: 1}}>
                        <Text style={[
                            zoo.mainTitle,
                            { textAlign: 'center', alignSelf: 'center', marginBottom: 30, marginTop: height * 0.1, fontSize: 45, lineHeight: 48 }
                        ]}>
                            Junior Keeper
                        </Text>

                        <Image source={lion} style={[zoo.lion, { position: 'static', width: 230, height: 220, marginBottom: 15 }]} />  
                        
                        <Text style={[
                            zoo.mainTitle,
                            { textAlign: 'center', alignSelf: 'center', marginBottom: 30, fontSize: 25, lineHeight: 28 }
                        ]}>
                            {correctAnswersCount}/{smarttestzoo.length}
                        </Text>

                        <View style={[zoo.row, {justifyContent: 'center', alignItems: 'center'}]}>
                             <TouchableOpacity
                                onPress={() => {
                                    setTeststarted(true);
                                    setSelectedOption(null);
                                    setQuestionIndex(0);
                                    setCorrectAnswersCount(0);
                                    setTestfinished(false);
                                }}
                            >
                                <Image source={testRetryButton} style={{width: 80, height: 80, resizeMode: 'contain', marginRight: 15}} />
                            </TouchableOpacity>
                             <TouchableOpacity
                                onPress={() => {
                                    setTeststarted(false);
                                    setSelectedOption(null);
                                    setQuestionIndex(0);
                                    setCorrectAnswersCount(0);
                                    setTestfinished(false);
                                }}
                            >
                                <Image source={testCloseButton} style={{width: 80, height: 80, resizeMode: 'contain'}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
            
        </View>
    )
};

export default Smarttestzoo;