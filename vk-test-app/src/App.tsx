import { useEffect, useState } from 'react'
import './App.css'
import { AxiosResponse } from 'axios'
import Repository from './types/repository'
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { List, ListItem, Card, CardContent, Typography, CardHeader, Avatar, CardActions, IconButton, AppBar, Toolbar, MenuItem, Select, Link, SelectChangeEvent } from '@mui/material';
import convertDateString from './utils/convertDate';
import getRepositories from './api/repositories';
import Sort from './types/sort';
import RepositoriesResponse from './types/repositoriesResponse';
import { useAppDispath, useAppSelector } from './redux/store';
import { repositoryEdit, repositoryReceved, repositoryRemoved, repositoryRequested, repositoryRequestFailed } from './redux/repositorySlice';
import EditModal from './components/EditModal/EditModal';

function App() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [editRepository, setEditRepository] = useState<Repository | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [fetching, setFetching] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const [sort, setSort] = useState<Sort>({
    sortField: "stars",
    sortOrder: "desc"
  })

  console.log("test -", import.meta.env.VITE_APP_TEST)

  const dispatch = useAppDispath();
  const repositoriesStore: Repository[] = useAppSelector(
    (state) => state.repository.items
  );

  useEffect(() => {
    setRepositories(repositoriesStore);
  }, [repositoriesStore]);

  useEffect(() => {
    if (fetching) {
      dispatch(repositoryRequested());
      getRepositories(sort, currentPage)
        .then((response: AxiosResponse<RepositoriesResponse>) => {
          const newRepositories = [...repositories, ...response.data.items]
          const newTotalCount = response.data.total_count
          setRepositories(newRepositories)
          setTotalCount(newTotalCount)
          setCurrentPage(prevState => prevState + 1)
          dispatch(repositoryReceved({
            items: newRepositories,
            totalCount: newTotalCount
          }
          ));
        })
        .catch(() => dispatch(repositoryRequestFailed()))
        .finally(() => setFetching(false))
    }
  }, [fetching])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [totalCount])

  useEffect(() => {
    setRepositories([])
    setCurrentPage(1)
    setFetching(true)
  }, [sort])

  const scrollHandler = (e: any) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight
    if ((scrollHeight - (scrollTop + innerHeight) < 100) && (repositories.length < totalCount)) {
      setFetching(true)
    }
  }

  const handleChangeSortOrder = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setSort((prevState) => ({
      ...prevState,
      sortOrder: value,
    }));
  }

  const handleChangeSortField = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setSort((prevState) => ({
      ...prevState,
      sortField: value,
    }));
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
    <div >
      <header>
        <AppBar position="fixed">
          <Toolbar className='appBar-box'>
            <Typography variant="h5">
              sort by
            </Typography>
            <Select
              id="sortField"
              value={sort.sortField}
              onChange={handleChangeSortField}
              className='appBar-select'>
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"forks"}>Fork</MenuItem>
              <MenuItem value={"stars"}>Stars</MenuItem>
              <MenuItem value={"watchers"}>Watchers</MenuItem>
            </Select>
            <Select
              id="sortOrder"
              value={sort.sortOrder}
              onChange={handleChangeSortOrder}
              className='appBar-select'>
              <MenuItem value={"asc"}>asc</MenuItem>
              <MenuItem value={"desc"}>desc</MenuItem>
            </Select>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </header>
      <main className='container'>
        {
          editRepository && <EditModal open={openModal} closeEditModal={handleClose} edit={edit} repository={editRepository} />
        }
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
        {fetching && (
          <div className="spinner">
            <RefreshIcon />
          </div>)}
      </main>
    </div>
  )
}

export default App
