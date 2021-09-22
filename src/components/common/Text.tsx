import React from 'react'
import styled from '@emotion/styled'
import {
  color,
  space,
  typography,
  system,
  TypographyProps,
  ColorProps,
  SpaceProps,
} from 'styled-system'

export type TextProps = React.PropsWithChildren<
  {
    as?: React.ElementType
    textTransform?: 'uppercase' | 'lowercase' | 'capitalize'
  } & TypographyProps &
    ColorProps &
    SpaceProps
>
export type TextRef = HTMLParagraphElement

const textTransform = system({ textTransform: true })

const TextStyle = styled.p(
  {
    margin: 0,
  },
  color,
  typography,
  space,
  textTransform
)

const Text = React.forwardRef<TextRef, TextProps>((props, ref) => (
  <TextStyle {...props} ref={ref} />
))

export default Text
