import React from 'react'
import { List, ListItem, ListItemText, Skeleton, Container } from '@mui/material'


const LoadingList = () => {
  const skeletonItems = Array.from({ length: 7 }, (_, index) => (
    <ListItem key={index}>
      <ListItemText>
        <Skeleton animation="wave" />
      </ListItemText>
    </ListItem>
  ))

  return (
    <Container maxWidth='xl'>
        <List>
            {skeletonItems}
        </List>
    </Container>
  ) 
}

export default LoadingList
