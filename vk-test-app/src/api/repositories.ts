import axios from 'axios'
import Sort from '../types/sort';

const getRepositories = (sort: Sort, currentPage: number) => {
  const encryptedText = "Z2hwX3NzMUNqN1c4S05CR3pEWDN6UXhFbUZtOXF1SWxBTDFxeVVBWQ==" 
  const token = atob(encryptedText);
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return axios.get(`https://api.github.com/search/repositories?q=javascript&sort=${sort.sortField}&order=${sort.sortOrder}&page=${currentPage}&per_page=10`)
}

export default getRepositories


