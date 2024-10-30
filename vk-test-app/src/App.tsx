import React, { useEffect, useState } from 'react';
import styles from "./App.module.css"
import Repository from './types/repository'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { List, ListItem, Card, CardContent, Typography, CardHeader, Avatar, CardActions, IconButton, Link } from '@mui/material';
import convertDateString from './utils/convertDate';
import { useAppDispath, useAppSelector } from './redux/store';
import { repositoryEdit, repositoryRemoved } from './redux/repositorySlice';
import EditModal from './components/EditModal/EditModal';
import useAxios from './hooks/useAxios';
import { useSort } from './hooks/useSort';
import Header from './components/Header/Header';
import Spinner from './components/Spinner/Spinner';

function App() {
  const dispatch = useAppDispath();
  const [editRepository, setEditRepository] = useState<Repository | null>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { sort } = useSort();
  const { repositories, setRepositories, fetching, totalCount, refetch, refresh } = useAxios(sort)
  const repositoriesStore: Repository[] = useAppSelector(
    (state) => state.repository.items
  );

  useEffect(() => {
    setRepositories(repositoriesStore);
  }, [repositoriesStore]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [totalCount])

  useEffect(() => {
    refresh()
  }, [sort])

  useEffect(() => {
    document.body.style.overflow = openModal ? 'hidden' : 'auto'
  }, [openModal])

  const scrollHandler = (e: any) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight
    if ((scrollHeight - (scrollTop + innerHeight) < 100) && (repositories.length < totalCount)) {
      refetch()
    }
  }

  const handleRemove = (repository: Repository) => {
    if (repositories.indexOf(repository) !== -1) {
      dispatch(repositoryRemoved({ repositoryId: repository.id }))
    }
  }

  const handleEdit = (repository: Repository) => {
    setOpenModal(true)
    setEditRepository(repository)
  }

  const handleClose = () => {
    setOpenModal(false)
    setEditRepository(null)
  }

  const edit = (repository: Repository) => {
    setOpenModal(false)
    setEditRepository(null)
    dispatch(repositoryEdit({ repository: repository }))
  }

  return (
    <div>
      {editRepository && <EditModal open={openModal} closeEditModal={handleClose} edit={edit} repository={editRepository} />}
      <Header />
      <main className={styles.container}>
        <List className='list'>
          {repositories.map((element) =>
          (
            <ListItem key={element.id} className='list__item'>
              <Card className='list__card'>
                <CardHeader
                  avatar={<Avatar alt="avatar" src={element.owner.avatar_url} />}
                  title={element.owner.login}
                  subheader={convertDateString(element.created_at)}
                />
                <CardContent>
                  <Typography variant="h5" className='card-title'>
                    {element.name}
                  </Typography>
                  <Typography >
                    {element.description}
                  </Typography>
                  <Typography >
                    <b>Fork: </b>{element.forks_count}
                  </Typography>
                  <Typography >
                    <b>Stars: </b>{element.stargazers_count}
                  </Typography>
                  <Typography >
                    <b>Watchers: </b>{element.watchers}
                  </Typography>
                  <Typography >
                    <b>Url: </b>
                    <Link href={element.html_url} underline="hover" target="_blank" rel="noopener">
                      LINK
                    </Link>
                  </Typography>
                </CardContent>

                <CardActions disableSpacing>
                  <IconButton aria-label="edit" color="success" onClick={() => handleEdit(element)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color="error" onClick={() => handleRemove(element)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </ListItem>
          )
          )}
        </List>
        <Spinner fetching={fetching} />
      </main>
    </div>
  )
}

export default App
