import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Button } from '~/components/ui/button'

type FabAction = {
  onPress: () => void
  icon?: React.ReactNode
  children?: React.ReactNode
}

type FabGroupProps = {
  actions: FabAction[]
  iconClosed: React.ReactNode
  iconOpened: React.ReactNode
}

export function FabGroup({ actions, iconClosed, iconOpened }: FabGroupProps) {
  const [open, setOpen] = useState(false)

  const actionAnimations = actions.map(() => ({
    translateY: useSharedValue(0),
    opacity: useSharedValue(0),
  }))

  useEffect(() => {
    if (open) {
      const base = 80
      const gap = 56

      actions.forEach((_, index) => {
        const reverseIndex = actions.length - 1 - index
        const offset = base + gap * reverseIndex

        actionAnimations[index].translateY.value = withTiming(-offset, {
          duration: 250,
        })
        actionAnimations[index].opacity.value = withTiming(1, {
          duration: 250,
        })
      })
    } else {
      actions.forEach((_, index) => {
        actionAnimations[index].translateY.value = withTiming(0, { duration: 150 })
        actionAnimations[index].opacity.value = withTiming(0, { duration: 150 })
      })
    }
  }, [open])

  return (
    <View className="absolute bottom-0 right-0 items-center">
      {actions.map((action, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ translateY: actionAnimations[index].translateY.value }],
          opacity: actionAnimations[index].opacity.value,
        }))

        return (
          <Animated.View
            key={index}
            className="absolute bottom-0"
            style={animatedStyle}
          >
            <Button
              variant="outline"
              size="icon"
              className="p-6"
              onPress={action.onPress}
            >
              {action.icon}
            </Button>
          </Animated.View>
        )
      })}

      <Button
        className="p-9 rounded-full"
        size="icon"
        onPress={() => setOpen((prev) => !prev)}
      >
        {open ? iconOpened : iconClosed}
      </Button>
    </View>
  )
}

export const Fab = ({
  children,
  onPress,
}: FabAction) => (
  <View className="absolute bottom-0 right-0 items-center">
    <Button
      className="p-9 rounded-full"
      size="icon"
      onPress={onPress}
    >
      {children}
    </Button>
  </View>
)