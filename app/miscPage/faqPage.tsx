import React from 'react';
import { ScrollView, ImageBackground, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function FaqPage() {
    return (
        <ImageBackground
            source={require('../../assets/backgrounds/RegisterBG.png')}
            style={{ width: '100%', height: '100%' }}
        >
            <ScrollView>
                <View
                    style={{
                        padding: 20,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 20,
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginRight: 10, marginTop: 5 }}>
                                <View
                                    style={{
                                        height: 40,
                                        width: 40,
                                        backgroundColor: 'white',
                                        borderRadius: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        shadowColor: '#000',
                                        elevation: 3,
                                    }}
                                >
                                    <FontAwesome
                                        size={18}
                                        name="question"
                                        color={'#000'}
                                        style={{ marginHorizontal: 14 }}
                                    />
                                </View>
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                Frequently Asked {'\n'}Question (FAQ)
                            </Text>
                        </View>
                        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
                            How do I get paid from my sorted trash?
                        </Text>
                        <Text>
                            We sell your trash to trash stations that created who needed it, this
                            includes trash recycler, biomass energy, rich soil, et cetera. This
                            station benefited from your trash, and you will take a fraction of its
                            value. Your trash value is dependent on the trash type and its value on
                            the market because not all trash type is valued equally.
                        </Text>
                        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
                            Why do I need to sort the trash myself and what happens if my trash is
                            not sorted correctly?
                        </Text>
                        <Text>
                            Unsorted trash can be found anywhere, but sorted trash is far more
                            valuable, this is because when trash stations are recycling, or
                            upcycling their trash, it needed to be sorted first. If the company
                            focuses on paper waste, tean compostable waste that can be found will
                            not be processed. So, when you yourself sort the trash, you can
                            navigate which trash go to which station, which not only help the
                            recycling team, but also maximize your trash potential! If your trash
                            is not sorted correctly, then the driver/the station owner have the
                            option to cancel your order because your order cannot be processed. You
                            then can sort your trash and try again.
                        </Text>
                        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
                            I am having issues on using the app, how to fix it?
                        </Text>
                        <Text>
                            Please contact our customer service support, for temporary, because we
                            don't have any customer support staff at the moment, you can contact us
                            on email, at{' '}
                            <Text style={{ color: 'blue' }}>trashare.bluejacket@gmail.com</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}
