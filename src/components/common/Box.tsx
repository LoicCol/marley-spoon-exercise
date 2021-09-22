import { forwardRef } from 'react'
import styled from '@emotion/styled'
import {
  flexbox,
  space,
  layout,
  color,
  border,
  position,
  shadow,
  FlexboxProps,
  SpaceProps,
  LayoutProps,
  ColorProps,
  BorderProps,
  PositionProps,
  ShadowProps,
} from 'styled-system'

export type BoxProps = React.PropsWithChildren<
  {
    onClick?: (event: MouseEvent) => void
  } & FlexboxProps &
    SpaceProps &
    LayoutProps &
    ColorProps &
    BorderProps &
    PositionProps &
    ShadowProps
>

export type BoxRef = HTMLDivElement

const BoxStyle = styled.div(
  (props) => (props.onClick ? { cursor: 'pointer' } : {}),
  space,
  layout,
  flexbox,
  color,
  border,
  position,
  shadow
)

const Box: React.ForwardRefExoticComponent<any> = forwardRef((props, ref) => (
  <BoxStyle {...props} ref={ref} />
))

export default Box
