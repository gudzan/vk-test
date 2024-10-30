import React, { useEffect, useState } from 'react';
import styles from "./App.module.css"
import Repository from './types/repository'
import { useAppDispath, useAppSelector } from './redux/store';
import { repositoryEdit, repositoryRemoved, repositorySorted } from './redux/repositorySlice';
import EditModal from './components/EditModal/EditModal';
import useAxios from './hooks/useAxios';
import { useSort } from './hooks/useSort';
import Header from './components/Header/Header';
import Spinner from './components/Spinner/Spinner';
import CardList from './components/CardList/CardList';


function App() {
  const dispatch = useAppDispath();
  const [editRepository, setEditRepository] = useState<Repository | null>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { sort } = useSort();
  const { repositories, setRepositories, fetching, totalCount, refetch, refresh } = useAxios()
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
    setRepositories(repositoriesStore);
  }, [openModal])

  const scrollHandler = (e: any) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight
    if ((scrollHeight - (scrollTop + innerHeight) < 100) && (repositories.length < totalCount)) {
      refetch()
      
    }
  }

  const clickDelete = (repository: Repository) => {
    dispatch(repositoryRemoved({ repositoryId: repository.id }))
  }

  const clickEdit = (repository: Repository) => {
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
    dispatch(repositorySorted(sort))
  }

  return (
    <div>
      {editRepository && <EditModal open={openModal} closeEditModal={handleClose} edit={edit} repository={editRepository} />}
      <Header />
      <main className={styles.container}>
        <CardList clickEdit={clickEdit} clickDelete={clickDelete} repositories={repositories} />
        <Spinner fetching={fetching} />
      </main>
    </div>
  )
}

export default App
