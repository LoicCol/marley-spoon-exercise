import styled from '@emotion/styled'
import React from 'react'
import {
  space,
  flexbox,
  layout,
  SpaceProps,
  FlexboxProps,
  LayoutProps,
} from 'styled-system'

export type ButtonProps = React.PropsWithChildren<
  { onClick: (event: MouseEvent) => void } & FlexboxProps &
    LayoutProps &
    SpaceProps
>
export type ButtonRef = HTMLButtonElement

const ButtonStyle = styled.button(
  {
    margin: 0,
    padding: '0 20px',
    width: 'fit-content',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #47d7ac',
    backgroundColor: '#47d7ac',
    borderRadius: 3,
    cursor: 'pointer',
    textDecoration: 'none',
    '::-moz-focus-inner': {
      border: 0,
    },
    fontSize: '2.7vmin',
    fontWeight: 450,
    transition: 'all 200ms',
    svg: {
      transition: 'all 200ms',
    },
    ':hover': {
      backgroundColor: '#47d7ac4f',
    },
  },
  flexbox,
  space,
  layout
)

const Button = React.forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  return <ButtonStyle {...props} ref={ref} />
})

Button.displayName = 'Button'

export default Button
