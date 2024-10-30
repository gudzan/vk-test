import React from 'react';
import { List, ListItem } from '@mui/material';
import styles from "./CardList.module.css"
import Repository from '../../types/repository';
import CardItem from '../CardItem/CardItem';

type CardListProps = {
  repositories: Repository[];
  clickEdit: Function;
  clickDelete: Function;
};

const CardList = ({ repositories, clickEdit, clickDelete }: CardListProps) => {

  return (
    <List data-testid="list" className={styles.list}>
      {repositories.map((element) =>
      (
        <ListItem key={element.id}>
          <CardItem clickEdit={clickEdit} clickDelete={clickDelete} element={element} />
        </ListItem>
      )
      )}
    </List>
  )
}

export default CardList;
