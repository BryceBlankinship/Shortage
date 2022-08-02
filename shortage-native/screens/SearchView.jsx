import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import VerticalCard from '../components/verticalCard';
import HorizontalCard from '../components/horizontalCard';

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 70,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
    },
    header: {
        marginLeft: 20,
        fontSize: 30,
        fontWeight: '700'
    },
    searchBox: {
        marginLeft: 20,
        marginTop: 10,
        padding: 10,
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        marginRight: 20,
        backgroundColor: 'white'
    },

    cardRowOuterContainer: {
        marginTop: 20,
    },

    cardRowContainer: {
        flex: 1,
        flexDirection: 'row',
        // match the height of the verticalCard so that the container doesnt spill into the next one
        maxHeight: 130,
    },

    cardRowLabel: {
        marginLeft: 20,
        marginBottom: 5,
    },

    cardColumnOuterContainer: {
        marginBottom: 100,
        marginLeft: 20,
        marginTop: 20,
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch'
    },

});

export default function SearchView() {
    return (
        <View style={styles.searchContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>Discover</Text>
                <TextInput style={styles.searchBox} placeholder='Search...'></TextInput>


                <CardRow label="Others near you searched" />

                <CardRow label="On sale near you" />

                <CardColumn label="Stores near you" />
            </ScrollView>
        </View>
    )
}

export function CardRow(props) {
    return (
        <View style={styles.cardRowOuterContainer}>
            <Text style={styles.cardRowLabel}>{props.label}</Text>
            <View style={styles.cardRowContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <VerticalCard />
                    <VerticalCard />
                    <VerticalCard />
                    <VerticalCard />
                    <VerticalCard />
                </ScrollView>
            </View>
        </View>
    );
}

export function CardColumn(props) {
    return (
        <View style={styles.cardColumnOuterContainer}>
            <Text>{props.label}</Text>
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
        </View>
    )
}