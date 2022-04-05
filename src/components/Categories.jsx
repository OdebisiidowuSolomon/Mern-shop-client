import React from 'react'
import Styled from 'styled-components'
import { categories } from '../data'
import { mobile } from '../responsive'
import { CategoryItem } from './CategoryItem'

const Container = Styled.div`
    display:flex;
    padding:20px;
    justify-content: space-between;
    ${mobile({ flexDirection: "column", padding:'0px' })}
`

export const Categories = () => {
  return (
    <Container>
 {categories.map(item => 
     <CategoryItem item={item} key={item.id}/>
 )}       
    </Container>
  )
}
