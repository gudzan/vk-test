import axios from 'axios'
import Sort from '../types/sort';

const getRepositories = (sort: Sort, currentPage: number) => {
  const token = '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'
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return axios.get(`https://api.github.com/search/repositories?q=javascript&sort=${sort.sortField}&order=${sort.sortOrder}&page=${currentPage}&per_page=10`)
}

export default getRepositories


