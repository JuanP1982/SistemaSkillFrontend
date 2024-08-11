import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { CardSkillProps, SkillType } from '../../interfaces/TypesSkill'

export default function CardSkill({ skill, handleAtualizar, handleDeletar }: CardSkillProps) {
  return (
    <View style={styles.container}>
      <Text>CardSkill</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})