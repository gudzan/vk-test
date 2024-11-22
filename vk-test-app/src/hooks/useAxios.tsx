import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Repository from '../types/repository';
import RepositoriesResponse from '../types/repositoriesResponse';
import { useAppDispath } from '../redux/store';
import { repositoryReceved, repositoryRequested, repositoryRequestFailed, repositorySorted } from '../redux/repositorySlice';
import { useSort } from './useSort';

const useAxios = () => {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [fetching, setFetching] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { sort } = useSort();
  const dispatch = useAppDispath();
  const token = "vxS57AlBFcomkcM0uWNmCtzee7Ddrc3Pj801"
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
        .finally(() => {
          setFetching(false)
          dispatch(repositorySorted(sort))
        })
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
