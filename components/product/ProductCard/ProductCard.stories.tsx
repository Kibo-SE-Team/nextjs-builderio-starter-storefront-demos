import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ProductCard from './ProductCard'
import type { ProductCardProps } from './ProductCard'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Product/ProductCard',
  component: ProductCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProductCard>

const Template: ComponentStory<typeof ProductCard> = (args) => <ProductCard {...args} />

export const Common = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Common.args = {
  image: `https://cdn-tp3.mozu.com/24645-37138/cms/37138/files/42d958c7-94d3-46be-812a-488601cf0c04?max=155&_mzcb=_1618890579000`,
  link: '/product/test-123',
  price: '$9.99',
  title: 'This is a product',
}

export const AddToCard = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Common.args = {
  image: `https://cdn-tp3.mozu.com/24645-37138/cms/37138/files/42d958c7-94d3-46be-812a-488601cf0c04?max=155&_mzcb=_1618890579000`,
  link: '/product/test-123',
  price: '$9.99',
  title: 'This is a product',
  isInCart: true,
}