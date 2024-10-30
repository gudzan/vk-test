import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, Typography, CardHeader, Avatar, CardActions, IconButton, Link } from '@mui/material';
import styles from "./CardItem.module.css"
import convertDateString from '../../utils/convertDate';
import Repository from '../../types/repository';

type CardItemProps = {
  element: Repository;
  clickEdit: Function;
  clickDelete: Function;
};

const CardItem = ({ element, clickEdit, clickDelete }: CardItemProps) => {

  return (
    <Card className={styles.card} data-testid="card">
      <CardHeader
        avatar={<Avatar alt="avatar" src={element.owner.avatar_url} />}
        title={element.owner.login}
        subheader={convertDateString(element.created_at)}
      />

      <CardContent>
        <Typography variant="h5">{element.name}</Typography>
        <Typography>{element.description}</Typography>
        <Typography><b>Fork: </b>{element.forks_count}</Typography>
        <Typography><b>Stars: </b>{element.stargazers_count}</Typography>
        <Typography><b>Watchers: </b>{element.watchers}</Typography>
        <Typography>
          <b>Url: </b>
          <Link href={element.html_url} underline="hover" target="_blank" rel="noopener">
            LINK
          </Link>
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="edit" color="success" onClick={() => clickEdit(element)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" color="error" onClick={() => clickDelete(element)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default CardItem;
