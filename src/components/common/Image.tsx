import React from 'react'
import styled from '@emotion/styled'
import { space, layout, SpaceProps, LayoutProps } from 'styled-system'

export type ImageProps = { src?: string } & SpaceProps & LayoutProps

export type ImageRef = HTMLImageElement

const ImageStyle = styled.img(
  {
    width: 'inherit',
  },
  space,
  layout
)

const Image = React.forwardRef<ImageRef, ImageProps>((props, ref) => (
  <ImageStyle ref={ref} {...props} />
))

export default Image
