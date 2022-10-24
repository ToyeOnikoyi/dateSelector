import { Text, StyleSheet, View, } from 'react-native'
import React, { Component } from 'react'
import CustomGrid from './Components/CustomGrid'

const DatePickerScreen = () => {

    const handleNodeClick = (currentList,item,index,startDay) => {
        let list = []

        list = [
            ...currentList.slice(0,index),
            {active:!item.active,id:(index+1)-startDay,dayOfWeekIndex:item.dayOfWeekIndex},
            ...currentList.slice(index+1)
        ]
        return list
    }

    return (
      <View style={{flex:1, backgroundColor:'grey'}}>
        <CustomGrid
         total={30} 
         active={[3,4,5,6,7]} 
         startDay='Fri'
         activeColor="#ff5b24"
         inActiveColor="#c4c4c4"
         disabled={true}
         handleNodeClick={handleNodeClick}
         daysPattern="Weekdays"
        />
      </View>
    )
  
}

const styles = StyleSheet.create({})

export default DatePickerScreen