import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';

const styles = StyleSheet.create({
    listContainer: {
        marginTop: 70,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: 20,
        alignSelf: 'stretch',
    },
    header: {
        fontSize: 30,
        fontWeight: '700'
    },

    listItem: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        width: 20,
        height: 20,
    }
});

// API calls to CRUD lists
function createList(){

}

const sampleData = [
    {
        title: 'First List Item!',
        desc: 'First list desc!',
        contents: [
            'Hammer',
            'Screwdriver',
            'Bucket',
            'Pipe fitting',
            'Bunny',
        ]
    },
    {
        title: 'Second List Item!',
        desc: 'Second list desc!',
        contents: [
            'Laundry Detergent',
            'Wasp Repellent',
            'Caulk',
            'Outlet Cover',
            'Magic 8 Ball',
        ]
    },
    {
        title: 'Third List Item!',
        desc: 'Third list desc!',
        contents: [
            'Salmon',
            'Steak',
            'Porkchops',
            'Spinach',
            'Black Top Hat',
        ]
    },
]

export default function ListView(){
    return(
        <View style={styles.listContainer}>
            <ScrollView>
                <Text style={styles.header}>Shopping Lists</Text>

                {sampleData.map((item, index) => {
                    return(
                        <ListItem item={item} key={index}/>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export function ListItem(props){
    return(
      <View style={styles.listItem}>
            <Text>{props.item.title}</Text>
            <Image style={styles.icon} source={require('../assets/forward-circle-outline.png')} />
      </View>
    );
}