import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AttractionReviewTle from './AttractionReviewTle'

const AttractionReviewsList = ({reviews}) => {
  return (
    <FlatList 
        data={reviews}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item)=> item._id}
        renderItem={({item})=> (
            <View style={{marginBottom: 10}}>
                <AttractionReviewTle review={item}/>
            </View>
        )}
    />
  )
}

export default AttractionReviewsList

const styles = StyleSheet.create({})