import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Sort from '../types/sort';
import Repository from '../types/repository';
import RepositoriesResponse from '../types/repositoriesResponse';
import { useAppDispath } from '../redux/store';
import { repositoryReceved, repositoryRequested, repositoryRequestFailed } from '../redux/repositorySlice';

const useAxios = (sort: Sort) => {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [fetching, setFetching] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const dispatch = useAppDispath();
  const token = "o1QPsZPH0o7oyZFH1jYsPkF3wYUBaD316jex"
  axios.defaults.headers.common['Authorization'] = `Bearer ${"ghp_" + token}`;

  useEffect(() => {
    if (fetching) {
      dispatch(repositoryRequested());
      axios.get(`https://api.github.com/search/repositories?q=javascript&sort=${sort.sortField}&order=${sort.sortOrder}&page=${currentPage}&per_page=10`)
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
  }, [fetching]);

  const refetch = () => {
    setFetching(true)
  }

  const refresh = () => {
    setRepositories([])
    setCurrentPage(1)
    setFetching(true)
  }

  return { repositories, setRepositories, fetching, refetch, refresh, totalCount };
};

export default useAxios;