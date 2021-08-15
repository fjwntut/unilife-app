import React, { useState } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { Color } from '../styles'

const Asset = name => require(`../../assets/${name}`)
export default Asset

export function Icon({ name, size, color, style, onPress }) {
    const iconStyle = StyleSheet.create({
        width: size || 20,
        height: size || 20,
        resizeMode: 'contain',
        tintColor: color || Color.grey0,
    })
    return (
        onPress? (
            <Pressable onPress={onPress}>
                <Image source={Asset(`icons/${name}.png`)} style={style? [style] : iconStyle} />
            </Pressable>
        ) : <Image source={Asset(`icons/${name}.png`)} style={style? [style] : iconStyle} />
    )
}