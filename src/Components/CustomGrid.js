import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import ActionSheet from 'react-native-actionsheet'
import DaysOfWeek from './DaysOfWeek'
import {HEIGHT_DIVISIBLE,WIDTH_DIVISIBLE} from '../Constants/Constants'




 const CustomGrid = ({total, active, startDay, activeColor, inActiveColor, disabled, daysPattern, handleNodeClick}) => {

    const [listData, setListData] = useState([])
    const [numColumns, setNumColumns] = useState(7)
    const [dayPattern, setDayPattern] = useState(daysPattern)
    const [gridDisabled, setGridDisabled] = useState(disabled)
    

    

    // actionsheet reference
    let actionSheet = useRef()

    // list of actionSheet options
    let optionsArray = ['Daily', 'Weekends', 'Weekdays', 'Every Other Day', 'Custom', 'Cancel']

    // object representing the static num of days of the week
    const startDayObj = {
        "Sun": 0,
        "Mon": 1,
        "Tue": 2,
        "Wed": 3,
        "Thu": 4,
        "Fri": 5,
        "Sat": 6,
    }

    useEffect(() => {
       dataArray(total)
    },[])

    const dataArray = async (total) => {
        let list = []
        let index = 0

        // sort the active property array 
        active = active.sort( (a,b) => a-b)
      
        
        let dayOfWeekIndex = startDayObj[startDay]
        for(let i =0; i < total; i++)
        {
            //
            if(i == active[index])
            { 
             list.push({active:true, id: i+1, dayOfWeekIndex:dayOfWeekIndex}) 
             index++
            }
        else{ 
            list.push({active:false, id: i+1, dayOfWeekIndex: dayOfWeekIndex}) 
            }
           
            if(dayOfWeekIndex == 6) 
            {
                dayOfWeekIndex = 0 
                continue
            }
            dayOfWeekIndex++
            
        }
        
        // fill in empty nodes to account for the startDay prop
        const arr = Array(startDayObj[startDay]).fill('empty');
        let newList = [...arr,...list]

        setListData(newList)

        // if the default day pattern is custom enable touch on grid
        dayPattern == optionsArray[optionsArray.length -2] ? setGridDisabled(false) : setGridDisabled(true) 

        return list
    }

    const itemColor = (activeState) => {
       return  activeState ? activeColor : inActiveColor
    }

    const showActionSheet = () => {
        actionSheet.current.show()
    }

    const actionSheetOptionSelected = (index) => {
        index != optionsArray.length -1 ? setDayPattern(optionsArray[index]) : console.log('cancel index change nothing')
        index == optionsArray.length -2 ?  setGridDisabled(false) : setGridDisabled(true) 

        if(optionsArray[index] == "Daily")
        {
            setListData(currentList => {
                let newArr = []
                currentList.map(obj => {
                     newArr.push({...obj,active:true})
                })
                return  newArr
                
            })
        }
        else if(optionsArray[index] == "Every Other Day")
        {
            setListData(currentList => {
                let newArr = []
                currentList.map(obj => {
                    if(obj.id % 2)
                        newArr.push({...obj,active:true})
                    else
                        newArr.push({...obj,active:false})

                })
                return  newArr
                
            })
        }
        else if(optionsArray[index] == "Weekends")
        {
            
            setListData(currentList => {
                let newArr = []
                currentList.map(obj => {
                    console.log("day of week: "+obj.dayOfWeekIndex)
                    if(obj.dayOfWeekIndex == 0 || obj.dayOfWeekIndex == 6)
                        newArr.push({...obj,active:true})
                    else
                        newArr.push({...obj,active:false})

                })
                return  newArr
                
            })
        }
        else if(optionsArray[index] == "Weekdays")
        {
            setListData(currentList => {
                let newArr = []
                currentList.map(obj => {
                    if(obj.dayOfWeekIndex != 0 && obj.dayOfWeekIndex != 6)
                        newArr.push({...obj,active:true})
                    else
                        newArr.push({...obj,active:false})

                })
                return  newArr
                
            })
        }
    }
    
  return (
    <View>
        <Text style={styles.titleText}>Date Selector</Text>
        <View style={styles.container}>
            
            <DaysOfWeek/>
            <FlatList
                data={listData}
                numColumns={7}
                scrollEnabled={false}
                renderItem ={ ({item,index}) =>{
                    return(
                        item.id ?
                        <TouchableOpacity disabled={gridDisabled} onPress={() => {
                            setListData(handleNodeClick(listData,item,index,startDayObj[startDay]))
                        }}>
                            <View style={ [styles.renderItemContainer,{backgroundColor: itemColor(item.active)}] }>
                                {/* <Text>{item.id}</Text> */}
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity disabled={gridDisabled}>
                            <View style={styles.renderEmptyContainer}/>
                        </TouchableOpacity>

                    )

                }}
            />
        </View>
        <TouchableOpacity style={styles.buttonStyle} onPress={showActionSheet}>
            <Text style={styles.buttonTextStyle}>{dayPattern}</Text>
        </TouchableOpacity>

        <ActionSheet
            ref={actionSheet}
            options={optionsArray}
            cancelButtonIndex={optionsArray.length -1}
            onPress={(index) => {
                // set the day pattern
                actionSheetOptionSelected(index)
                
            }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        margin:10,
        marginTop:20,
        backgroundColor:'white',
    },
    titleText:{
        marginTop:60,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20

    },
    renderItemContainer:{
        alignItems:'center',
        justifyContent:'center',
        margin:4,
        width: Dimensions.get("window").width * WIDTH_DIVISIBLE,
        height:  Dimensions.get("window").width / HEIGHT_DIVISIBLE,
      
    },
    renderEmptyContainer:{
        alignItems:'center',
        justifyContent:'center',
        margin:4,
        backgroundColor:"white",
        width: Dimensions.get("window").width * WIDTH_DIVISIBLE,
        height:  Dimensions.get("window").width / HEIGHT_DIVISIBLE,
    },
    textStyle:{
        justifyContent:'center',
        alignContent:'center'
    },
    buttonStyle:{
        margin: 10,
        height: 40,
        padding: 10,
        backgroundColor: '#40a060'
    },
    buttonTextStyle:{
        color:'white',
        textAlign:'center',
        textTransform: 'capitalize',
        fontSize: 18
    }

})

export default CustomGrid