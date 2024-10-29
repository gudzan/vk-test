import axios from 'axios'
import Sort from '../types/sort';

const getRepositories = (sort: Sort, currentPage: number) => {
  const token = "o1QPsZPH0o7oyZFH1jYsPkF3wYUBaD316jex"
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${"ghp_"+token}`;
  return axios.get(`https://api.github.com/search/repositories?q=javascript&sort=${sort.sortField}&order=${sort.sortOrder}&page=${currentPage}&per_page=10`)
}

export default getRepositories


