import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

const DaysOfWeek = () => {

    // list of days that are in the week
    const daysList = ['S','M','T','W','T','F','S']

  return (
    <View style={styles.container}>
      <FlatList
      data={daysList}
      scrollEnabled={false}
      horizontal={true}
      renderItem={({item}) => {
        return <Text style={styles.textStyle}>{item}</Text>
      }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    textStyle:{
        margin:20
    }
})



export default DaysOfWeek