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

function App() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [fetching, setFetching] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [sort, setSort] = useState<Sort>({
    sortField: "stars",
    sortOrder: "desc"
  })

  useEffect(() => {
    if (fetching) {
      // const token = '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'
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // axios.get(`https://api.github.com/search/repositories?q=javascript&sort=${sort.sortField}&order=${sort.sortOrder}&page=${currentPage}&per_page=10`)
      //   .then((response: AxiosResponse<GetRepositoriesResponse>) => {
      //     const responseData = response.data;
      //     setRepositories([...repositories, ...responseData.items])
      //     setTotalCount(responseData.total_count)
      //     setCurrentPage(prevState => prevState + 1)
      //   })
      //   .finally(() => setFetching(false))

      getRepositories(sort, currentPage)
        .then((response: AxiosResponse<RepositoriesResponse>) => {
          setRepositories([...repositories, ...response.data.items])
          setTotalCount(response.data.total_count)
          setCurrentPage(prevState => prevState + 1)
        })
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
                  <IconButton aria-label="edit" color="success" onClick={() => { console.log("edit") }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color="error" onClick={() => { console.log("delete") }}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </ListItem>
          )
          )}
        </List>
        {fetching && (
          <div className="icon">
            <RefreshIcon />
          </div>)}
      </main>
    </div>
  )
}

export default App
