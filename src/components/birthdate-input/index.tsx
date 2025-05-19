import React from 'react'
import { TextInputProps } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Input } from '../ui/input'

interface DateInputProps extends TextInputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
}

export const DateInput = ({ value, onChangeText, ...props }: DateInputProps) => (
  <TextInputMask
    {...props}
    customTextInput={Input}
    type={'datetime'}
    options={{ format: 'DD/MM/YYYY' }}
    value={value}
    onChangeText={onChangeText}
    keyboardType="numeric"
  />
)
